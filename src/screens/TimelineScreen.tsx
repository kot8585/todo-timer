import React, {useMemo, useRef, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TimelineType} from '../api/types';
import {Colors} from '../assets/color';
import CreateTimelineModal from '../components/CreateTimelineModal';
import EditTimelineModal from '../components/EditTimelineModal';
import TimelineEvent from '../components/TimelineEvent';
import useTimeline from '../hooks/useTimeline';
import useSelectedDateStore from '../store/selecteDateStore';

export default function TimelineScreen() {
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const [showModal, setShowModal] = useState(false);
  const clickedTime = useRef(5);

  const handlePress = hour => {
    // date받아야되는데
    clickedTime.current = hour;
    setShowModal(true);
  };

  // 시간표 데이터를 생성하는 함수
  const generateTimeTableView = useMemo(() => {
    let timeTableData = [];
    // 오전 5시부터 다음날 오전 4시까지 총 24줄 생성
    for (let hour = 5; hour <= 28; hour++) {
      // 시간에 따른 문자열 생성
      const hourText = hour % 24;

      // row 생성
      timeTableData.push(
        <Pressable
          key={hour}
          style={styles.row}
          onPress={() => {
            handlePress(hourText);
          }}>
          {/* 컬럼 생성 */}
          <Text style={styles.hourText}>{hourText}</Text>

          {/* 10분 간격의 컬럼 생성 */}
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <View key={index} style={styles.column} />
          ))}
        </Pressable>,
      );
    }
    return timeTableData;
  }, []);

  const {
    getAllTimeline: {data, isLoading, error},
  } = useTimeline(selectedDate);

  const [showUpdateTimelineModal, setShowUpdateTimelineModal] =
    useState<boolean>(false);

  const updateTimelineRef = useRef<undefined | TimelineType>(undefined);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.timeTable}>
        {generateTimeTableView}
        {data?.map(timelineEvent => (
          <TimelineEvent
            timelineEvent={timelineEvent}
            key={timelineEvent.idx}
            updateTimelineRef={updateTimelineRef}
            setShowUpdateTimelineModal={setShowUpdateTimelineModal}
          />
        ))}
      </View>
      {showModal && (
        <CreateTimelineModal
          visible={showModal}
          setModalVisible={setShowModal}
          clickedTime={clickedTime.current}
        />
      )}
      {showUpdateTimelineModal && (
        <EditTimelineModal
          visible={showUpdateTimelineModal}
          setModalVisible={setShowUpdateTimelineModal}
          updateTimeline={updateTimelineRef.current!}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  timeTable: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: Colors.light.borderDefault,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.light.borderDefault,
  },
  hourText: {
    width: '10%', // 1열은 시간을 나타내므로 너비를 조절하여 글자에 맞게 설정
    textAlign: 'center',
    color: Colors.light.bodyInActive,
  },

  column: {
    width: '15%',
    height: 24,
    borderLeftWidth: 1,
    borderColor: Colors.light.borderDefault,
  },
});
