import React from 'react';
import {Pressable} from 'react-native';
import {TimelineType} from '../../api/types';

type TimelineEventProps = {
  timelineEvent: TimelineType;
  updateTimelineRef: React.MutableRefObject<TimelineType | undefined>;
  setShowUpdateTimelineModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TimelineEvent({
  timelineEvent,
  updateTimelineRef,
  setShowUpdateTimelineModal,
}: TimelineEventProps) {
  console.log('TimelineEvent', timelineEvent);

  const height = 25;

  const viewCount =
    (timelineEvent.endHour % 24) - (timelineEvent.startHour % 24) + 1;

  function calculateWidth(i: number): number {
    if (viewCount === 1) {
      // 초 단위라서 분 단위로 바꿔줌
      return timelineEvent.executionTime / 60;
    }
    if (i === 1) {
      return 60 - timelineEvent.startMinute;
    }

    if (i === viewCount) {
      return timelineEvent.endMinute;
    }

    return 60;
  }

  const generateTimeTableData = () => {
    console.log('색깔 왜 안나옴', timelineEvent.todoColor);
    let timeTableData = [];

    //다음날로 넘어갈 수도 있으니까 24로 나눔
    for (let i = 1; i <= viewCount; i++) {
      const numberStartHour = Number(timelineEvent.startHour);
      const top =
        numberStartHour + i >= 6
          ? (numberStartHour + i - 6) * height + (numberStartHour + i - 6)
          : (numberStartHour + i + 18) * height + (numberStartHour + i + 18);
      const width = calculateWidth(i) * 1.5;
      const left = i === 1 ? timelineEvent.startMinute * 1.5 + 10 : 10;

      timeTableData.push(
        <Pressable
          key={timelineEvent.idx + '' + i}
          onPress={() => {
            updateTimelineRef.current = timelineEvent;
            setShowUpdateTimelineModal(true);
          }}
          style={{
            position: 'absolute',
            top: top,
            height: height,
            left: `${left}%`,
            width: `${width}%`,
            backgroundColor: timelineEvent.todoColor,
            marginLeft: 1,
            opacity: 0.7,
          }}
        />,
      );
    }

    return timeTableData;
  };

  return generateTimeTableData();
}
