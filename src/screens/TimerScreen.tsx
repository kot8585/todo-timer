import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import useTimeline from '../hooks/useTimeline';
import useSelectedDateStore from '../store/selecteDateStore';
import TodoList from '../components/TodoList';
import useTodo from '../hooks/useTodos';
import {Colors} from '../assets/color';
import {TodoType} from '../../api/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DefaultText from '../components/ui/DefaultText';

export default function TimerScreen() {
  const route = useRoute();
  const [showTodoListModal, setShowTodoListModal] = useState(false);
  const [todoTitle, setTodoTitle] = useState(
    route.params?.title || '투두를 선택해주세요',
  );
  const todoIdxRef = useRef(route.params?.idx);

  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const navigation = useNavigation();

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const startDateTimeRef = useRef<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    if (route.params) {
      let interval: NodeJS.Timeout;

      interval = setInterval(() => {
        const currentTime = dayjs();
        const difference = currentTime.diff(startDateTimeRef.current, 'second');

        setElapsedTime(difference);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [route.params]);

  const {createTimelineMutation} = useTimeline(selectedDate);

  // TODO: 할일 완료 버튼 누르면???
  const handleStop = (action: string) => {
    const timeline = {
      todoIdx: route.params ? route.params.idx : 1,
      startDateTime: startDateTimeRef.current,
      endDateTime: dayjs(),
      elapsedTime: elapsedTime,
      action: action,
    };
    // mutation
    createTimelineMutation.mutate(timeline);
    navigation.navigate('HomeScreen');
  };

  const formatTime = (seconds: number): string => {
    const formattedTime = dayjs()
      .startOf('day')
      .add(seconds, 'second')
      .format('HH:mm:ss');
    return formattedTime;
  };

  const {
    getAllTodos: {data, isLoading, error},
  } = useTodo(selectedDate);

  const todoHandlePress = (todo: TodoType) => {
    console.log('todo 눌림');
    setTodoTitle(todo.title);
    todoIdxRef.current = todo.idx;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        {route.params ? (
          <DefaultText text={route.params.title} />
        ) : (
          <Pressable
            onPress={() => {
              setShowTodoListModal(true);
            }}
            style={styles.todo}>
            <Text style={styles.text}>투두를 선택해주세요</Text>
            <Icon name="chevron-right" size={22} style={styles.icon} />
          </Pressable>
        )}
        <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => handleStop('stop')}>
            <DefaultText text="중지" />
          </Pressable>
          <Pressable onPress={() => handleStop('complete')}>
            <DefaultText text="완료" />
          </Pressable>
        </View>
      </View>
      <Modal visible={showTodoListModal} transparent={true}>
        {showTodoListModal && (
          <Pressable
            onPress={() => {
              setShowTodoListModal(false);
            }}
            style={styles.background}>
            <View style={styles.underWhiteBox}>
              <TodoList
                todoHandlePress={todoHandlePress}
                showDotsIcon={false}
              />
            </View>
          </Pressable>
        )}
      </Modal>
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
  text: {
    fontSize: 14,
    color: Colors.light.bodyDefault,
    ...Platform.select({
      android: {lineHeight: 18},
    }),
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
