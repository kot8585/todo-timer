import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import useTimeline from '../hooks/useTimeline';
import useSelectedDateStore from '../store/selecteDateStore';
import TodoList from '../components/TodoList';
import useTodo from '../hooks/useTodos';
import {Colors} from '../assets/color';
import {TodoType} from '../../api/types';

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
    setTodoTitle(todo.title);
    todoIdxRef.current = todo.idx;
  };

  return (
    <View style={styles.container}>
      <View>
        {route.params ? (
          <Text>{route.params.title}</Text>
        ) : (
          <Pressable
            onPress={() => {
              setShowTodoListModal(true);
            }}>
            <Text>투두를 선택해주세요</Text>
          </Pressable>
        )}
        <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
        <View style={styles.buttonContainer}>
          <Button title="중지" onPress={() => handleStop('stop')} />
          <Button title="할일완료" onPress={() => handleStop('complete')} />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 32,
    marginBottom: 20,
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
