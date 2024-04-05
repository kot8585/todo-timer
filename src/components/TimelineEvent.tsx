import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {TimelineType} from '../api/types';

type TimelineEventProps = {
  timelineEvent: TimelineType;
  updateTimelineRef: React.MutableRefObject<TimelineType | undefined>;
  setShowUpdateTimelineModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const HEIGHT = 24;

export default function TimelineEvent({
  timelineEvent,
  updateTimelineRef,
  setShowUpdateTimelineModal,
}: TimelineEventProps) {
  const {timelinePositions, widestTimelineOrdinary} = getTimelinePosition(
    Number(timelineEvent.startHour),
    Number(timelineEvent.startMinute),
    Number(timelineEvent.endHour),
    Number(timelineEvent.endMinute),
    timelineEvent.executionTime,
  );

  return timelinePositions.map((timelinePosition, index) => (
    <Pressable
      key={index}
      onPress={() => {
        updateTimelineRef.current = timelineEvent;
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
          opacity: 0.5,
          flex: 1,
        }}>
        {index + 1 === widestTimelineOrdinary && (
          <Text>{timelineEvent.todoTitle}</Text>
        )}
      </View>
    </Pressable>
  ));
}

function getTimelinePosition(
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
    const endHourStartHourSubtract = (endHour % 24) - (startHour % 24) + 1;
    if (endMinute === 0) {
      return endHourStartHourSubtract - 1;
    }
    return endHourStartHourSubtract;
  })();

  for (let i = 1; i <= viewCount; i++) {
    const width = (() => {
      if (viewCount === 1) {
        // 초 단위라서 분 단위로 바꿔줌
        return (executionTime / 60) * 1.5;
      }
      if (i === 1) {
        return (60 - startMinute) * 1.5;
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

    timelinePositions.push({width, top, left});
  }

  return {timelinePositions, widestTimelineOrdinary};
}
