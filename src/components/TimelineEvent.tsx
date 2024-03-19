import React from 'react';
import {View} from 'react-native';
import {TimelineType} from '../../api/types';

type TimelineEventProps = {
  date: string;
  timelineEvent: TimelineType;
};

export default function TimelineEvent({
  date,
  timelineEvent,
}: TimelineEventProps) {
  const height = 25;

  const viewCount =
    (timelineEvent.endHour % 24) - (timelineEvent.startHour % 24) + 1;

  function calculateWidth(i) {
    if (viewCount === 1) {
      return timelineEvent.durationTime;
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
    let timeTableData = [];

    //다음날로 넘어갈 수도 있으니까 24로 나눔
    for (let i = 1; i <= viewCount; i++) {
      //TODO: 20 맞는지 확인하기
      const top =
        timelineEvent.startHour + i >= 6
          ? (timelineEvent.startHour + i - 6) * height +
            (timelineEvent.startHour + i - 6)
          : (timelineEvent.startHour + i + 20) * height +
            (timelineEvent.startHour + i + 20);

      const width = calculateWidth(i) * 1.5;
      const left = i === 1 ? timelineEvent.startMinute * 1.5 + 10 : 10;

      timeTableData.push(
        <View
          style={{
            position: 'absolute',
            top: top,
            height: height,
            left: `${left}%`,
            width: `${width}%`,
            backgroundColor: '#FFAAAA',
            marginLeft: 1,
            // opacity: 0.7,
          }}
        />,
      );
    }

    return timeTableData;
  };

  return generateTimeTableData();
}
