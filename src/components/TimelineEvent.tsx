import dayjs from 'dayjs';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {GetTimelineResponse, TimelineType} from '../api/types';

type TimelineEventProps = {
  timelineEvent: GetTimelineResponse;
  updateTimelineRef: React.MutableRefObject<TimelineType | undefined>;
  setShowUpdateTimelineModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const HEIGHT = 24;

export default function TimelineEvent({
  timelineEvent,
  updateTimelineRef,
  setShowUpdateTimelineModal,
}: TimelineEventProps) {
  //TODO: 이거 class로 사용할 수 있나 보기...
  const formatStartDateTime = dayjs(timelineEvent.startDateTime);
  const startHour = formatStartDateTime.get('hour');
  const startMinute = formatStartDateTime.get('minute');

  const formatEndDateTime = dayjs(timelineEvent.endDateTime);
  const endHour = formatEndDateTime.get('hour');
  const endMinute = formatEndDateTime.get('minute');

  const {timelinePositions, widestTimelineOrdinary} = getTimelinePosition(
    formatStartDateTime,
    formatEndDateTime,
    startHour,
    startMinute,
    endHour,
    endMinute,
    timelineEvent.executionTime,
  );

  return timelinePositions.map((timelinePosition, index) => (
    <Pressable
      key={index}
      onPress={() => {
        updateTimelineRef.current = {
          ...timelineEvent,
          startHour,
          startMinute,
          endHour,
          endMinute,
        };
        setShowUpdateTimelineModal(true);
      }}
      style={{
        position: 'absolute',
        top: timelinePosition.top,
        height: HEIGHT,
        left: `${timelinePosition.left}%`,
        width: `${timelinePosition.width}%`,
        borderColor: timelineEvent.todoColor,
        borderLeftWidth: index === 0 ? 1 : 0,
        borderRightWidth: index + 1 === timelinePositions.length ? 1 : 0,
        marginLeft: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          backgroundColor: timelineEvent.todoColor,
          flex: 1,
          opacity: 0.6,
          paddingHorizontal: 3,
        }}>
        {index + 1 === widestTimelineOrdinary && (
          <Text>{timelineEvent.todoTitle}</Text>
        )}
      </View>
    </Pressable>
  ));
}

function getTimelinePosition(
  formatStartDateTime: dayjs.Dayjs,
  formatEndDateTime: dayjs.Dayjs,
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number,
  executionTime: number,
) {
  const timelinePositions = [];
  let widestTimelineOrdinary = 1;
  let widestWidth = 0;

  const viewCount = (() => {
    // 다음날로 넘어가면 1시부터 시작하기때문에 24로 나눔
    const diffHour = formatEndDateTime.diff(formatStartDateTime, 'hour');
    return diffHour + 1;
  })();
  console.log('viewCount', viewCount);

  for (let i = 1; i <= viewCount; i++) {
    const width = (() => {
      if (viewCount === 1) {
        // 초 단위라서 분 단위로 바꿔줌
        return (executionTime / 60) * 1.5;
      }
      if (i === 1) {
        return (60 - startMinute) * 1.5;
      }

      if (i === viewCount && endMinute === 0) {
        return 0;
      }

      if (i === viewCount) {
        return endMinute * 1.5;
      }

      return 60 * 1.5;
    })();

    const top =
      startHour + i >= 6
        ? (startHour + i - 6) * HEIGHT + (startHour + i - 6)
        : (startHour + i + 18) * HEIGHT + (startHour + i + 18);
    const left = i === 1 ? startMinute * 1.5 + 10 : 10;

    if (widestWidth < width) {
      widestWidth = width;
      widestTimelineOrdinary = i;
    }

    if (width !== 0) {
      timelinePositions.push({width, top, left});
    }
  }

  return {timelinePositions, widestTimelineOrdinary};
}
