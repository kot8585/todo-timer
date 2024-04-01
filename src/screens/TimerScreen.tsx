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
import {getToday} from '../utils/formatDateTime';

export default function TimerScreen() {
  const route = useRoute();
  const [showTodoListModal, setShowTodoListModal] = useState(false);
  const [todo, setTodo] = useState(route.params?.todo);
  useEffect(() => {
    if (route.params?.todo) {
      setTodo(route.params.todo);
    }
  }, [route.params?.todo]);
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const navigation = useNavigation();

  const [executionTime, setExecutionTime] = useState<number>(0);
  const startDateTimeRef = useRef<dayjs.Dayjs>(dayjs());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (selectedDate !== getToday()) {
      //TODO: 오늘날짜가 아니여서 측정할 수 없다고 하기
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

  useEffect(() => {
    if (route.params) {
      startTimer();

      return endTimer;
    }
  }, [route.params]);

  const {createTimelineMutation} = useTimeline(selectedDate);

  const handleStop = (action: string) => {
    endTimer();
    const timeline = {
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

  const formatTime = (seconds: number): string => {
    const formattedTime = dayjs()
      .startOf('day')
      .add(seconds, 'second')
      .format('HH:mm:ss');
    return formattedTime;
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
          style={styles.todo}>
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
            <Pressable onPress={startTimer} disabled={!todo?.title}>
              <DefaultText text="시작" />
            </Pressable>
          )}
          <Pressable
            onPress={() => handleStop('complete')}
            disabled={!intervalRef.current}>
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
  },
  todoColor: (backgroundColor: string) => ({
    backgroundColor: backgroundColor,
    width: 18,
    height: 18,
    borderRadius: 25,
    marginRight: 6,
  }),
  text: {
    fontSize: 14,
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
  underWhiteBox: {
    width: '100%',
    backgroundColor: Colors.light.background,
    elevation: 2,
    borderRadius: 8,
    alignItems: 'flex-end',
    padding: 12,
  },
});
