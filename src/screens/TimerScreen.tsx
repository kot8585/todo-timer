import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TodoType} from '../api/types';
import {Colors} from '../assets/color';
import CustomModal from '../components/CustomModal';
import TodoList from '../components/TodoList';
import DefaultText from '../components/ui/DefaultText';
import useTimeline from '../hooks/useTimeline';
import useSelectedDateStore from '../store/selecteDateStore';
import {formatTime, getToday} from '../utils/formatDateTime';
import useUserStore from '../store/userStore';

export default function TimerScreen() {
  const route = useRoute();
  const [showTodoListModal, setShowTodoListModal] = useState(false);
  const [todo, setTodo] = useState(route.params?.todo);

  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const setToday = useSelectedDateStore(state => state.setToday);
  const user = useUserStore(state => state.user);
  const navigation = useNavigation();

  const [executionTime, setExecutionTime] = useState<number>(0);
  const startDateTimeRef = useRef<dayjs.Dayjs>(dayjs());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showNotTodayModal, setShowNotTodayModal] = useState(false);

  const startTimer = () => {
    if (selectedDate.format('YYYY-MM-DD') !== getToday().format('YYYY-MM-DD')) {
      setShowNotTodayModal(true);
      return;
    }
    startDateTimeRef.current = dayjs();
    intervalRef.current = setInterval(() => {
      const currentTime = dayjs();
      const difference = currentTime.diff(startDateTimeRef.current, 'second');
      setExecutionTime(difference);
    }, 1000);
  };

  const endTimer = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setExecutionTime(0);
  };

  // 왜 startTimer를 useEffect에 넣어야하지?
  useEffect(() => {
    if (route.params?.todo) {
      setTodo(route.params.todo);
      startTimer();

      return endTimer;
    }
  }, [route.params]);

  const {createTimelineMutation} = useTimeline(selectedDate);

  const handleStop = (action: 'stop' | 'complete') => {
    endTimer();
    const timeline = {
      userUid: user!.uid,
      todoIdx: todo?.idx,
      startDateTime: startDateTimeRef.current,
      endDateTime: dayjs(),
      executionTime: executionTime,
      action: action,
    };
    // mutation
    createTimelineMutation.mutate(timeline);
    navigation.navigate('TodoList');
  };

  const todoHandlePress = (todo: TodoType) => {
    console.log('todo 눌림');
    setTodo(todo);
    setShowTodoListModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Pressable
          onPress={() => {
            setShowTodoListModal(true);
          }}
          disabled={!!intervalRef.current}
          style={styles.todo}
          hitSlop={10}>
          <View style={styles.todoColor(todo?.color || '#a4a4a4')} />
          <Text style={styles.text}>
            {todo?.title || '투두를 선택해주세요'}
          </Text>
          <Icon name="chevron-right" size={22} style={styles.icon} />
        </Pressable>

        <Text style={styles.timer}>{formatTime(executionTime)}</Text>
        <View style={styles.buttonContainer}>
          {intervalRef.current ? (
            <Pressable onPress={() => handleStop('stop')}>
              <DefaultText text="중지" />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                if (!todo) {
                  setShowTodoListModal(true);
                } else {
                  startTimer();
                }
              }}
              hitSlop={20}>
              <DefaultText text="시작" />
            </Pressable>
          )}
          <Pressable
            onPress={() => handleStop('complete')}
            disabled={!intervalRef.current}
            hitSlop={20}>
            <DefaultText text="완료" />
          </Pressable>
        </View>
      </View>
      <CustomModal
        visible={showTodoListModal}
        setModalVisible={setShowTodoListModal}
        position={'under'}>
        <TodoList todoHandlePress={todoHandlePress} showDotsIcon={false} />
      </CustomModal>
      <CustomModal
        visible={showNotTodayModal}
        setModalVisible={setShowNotTodayModal}
        position={'middle'}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            오늘의 날짜로 가서 타이머를 실행시켜주세요
          </Text>
          <Pressable
            onPress={() => {
              setToday();
              setTodo(undefined);
              setShowNotTodayModal(false);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>{'오늘로 가기'}</Text>
          </Pressable>
        </View>
      </CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 250,
  },
  todoColor: (backgroundColor: string) => ({
    backgroundColor: backgroundColor,
    width: 18,
    height: 18,
    borderRadius: 25,
    marginRight: 8,
  }),
  modalContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 15,
    gap: 10,
    paddingBottom: 3,
  },
  modalText: {
    fontSize: 14,
    color: Colors.light.bodyDefault,
  },
  text: {
    fontSize: 14,
    flexWrap: 'wrap',
    flexShrink: 1,
    color: Colors.light.bodyDefault,
    ...Platform.select({
      android: {lineHeight: 18},
    }),
    marginRight: 6,
  },
  icon: {color: Colors.light.iconDefault},
  timer: {
    fontSize: 40,
    marginBottom: 20,
    color: Colors.light.bodyDefault,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.light.buttonDefault,
    borderColor: Colors.light.borderDefault,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  buttonText: {
    fontSize: 14,
    color: '#626262',
  },
  underWhiteBox: {
    width: '100%',
    backgroundColor: Colors.light.background,
    elevation: 2,
    borderRadius: 8,
    alignItems: 'flex-end',
    padding: 12,
  },
});
