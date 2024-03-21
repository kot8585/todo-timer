import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import {getTimelines} from '../../api/timeline';
import TimelineEvent from './TimelineEvent';
import useUserStore from '../store/userStore';
import dayjs from 'dayjs';

export default function TimelineTable() {
  const user = useUserStore(state => state.user);
  // 시간표 데이터를 생성하는 함수
  const generateTimeTableData = () => {
    let timeTableData = [];
    // 오전 5시부터 다음날 오전 4시까지 총 24줄 생성
    for (let hour = 5; hour <= 28; hour++) {
      // 시간에 따른 문자열 생성
      const hourText = (hour % 24).toString().padStart(2, '0');

      // row 생성
      timeTableData.push(
        <View key={hour} style={styles.row}>
          {/* 컬럼 생성 */}
          <Text style={styles.hourText}>{hourText}</Text>

          {/* 10분 간격의 컬럼 생성 */}
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <View key={index} style={styles.column} />
          ))}
        </View>,
      );
    }
    return timeTableData;
  };

  const startDateTime = dayjs()
    .set('hour', 5)
    .set('minute', 0)
    .set('second', 0);
  const result = useQuery(['timelines'], () =>
    getTimelines(user?.uid, startDateTime),
  );
  const {data, error, isLoading} = result;
  return (
    <View style={styles.container}>
      {generateTimeTableData()}

      {data?.map(timelineEvent => (
        <TimelineEvent
          timelineEvent={timelineEvent}
          date="2024-03-13"
          key={timelineEvent.idx}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  hourText: {
    width: '10%', // 1열은 시간을 나타내므로 너비를 조절하여 글자에 맞게 설정
    textAlign: 'center',
  },

  column: {
    width: '15%',
    height: 25,
    borderLeftWidth: 1,
    borderColor: 'black',
  },
});
