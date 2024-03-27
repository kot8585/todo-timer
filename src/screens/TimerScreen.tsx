import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import useTimeline from '../hooks/useTimeline';
import useSelectedDateStore from '../store/selecteDateStore';

export default function TimerScreen() {
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const route = useRoute();
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

  return (
    <View style={styles.container}>
      {route.params ? <Text>{route.params.title}</Text> : <Text>안녕</Text>}
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      <View style={styles.buttonContainer}>
        <Button title="중지" onPress={() => handleStop('stop')} />
        <Button title="할일완료" onPress={() => handleStop('complete')} />
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
