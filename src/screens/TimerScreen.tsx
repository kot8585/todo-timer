import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useMutation} from 'react-query';
import {createTimeline} from '../../api/timeline';

export default function TimerScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const {idx, title} = route.params;
  console.log('todo: ', idx, title);

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const startDateTimeRef = useRef<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      const currentTime = dayjs();
      const difference = currentTime.diff(startDateTimeRef.current, 'second');

      setElapsedTime(difference);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createTimelineMutation = useMutation(createTimeline, {
    onError: (error, variables, context) => {
      // 오류 발생 시 처리
      console.log('useMutation 에러', error);
    },
    onSuccess: (data, variables, context) => {
      // 성공 시 처리
      console.log('useMutation 성공', data);
    },
  });

  // TODO: 할일 완료 버튼 누르면???
  const handleStop = () => {
    const timeline = {
      todoIdx: idx,
      startDateTime: startDateTimeRef.current,
      endDateTime: dayjs(),
      elapsedTime: elapsedTime,
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

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      <View style={styles.buttonContainer}>
        <Button title="중지" onPress={handleStop} />
        <Button title="할일완료" onPress={handleStop} />
      </View>
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
});
