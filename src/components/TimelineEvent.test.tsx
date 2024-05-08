import {
  TimelinePositionType,
  getLocalHourMinute,
  getTimelinePosition,
} from './TimelineEvent';

describe('getLocalHourMinute', () => {
  it('utc시간이 5시이면 로컬 시간은 14시가 나와야한다', () => {
    const utcDateTimeStr = '2024-05-06T05:00:00.000Z';

    const {hour, minute} = getLocalHourMinute(utcDateTimeStr);

    expect(hour).toBe(14);
    expect(minute).toBe(0);
  });
});

describe('getTimelinePosition', () => {
  const TIMELINE_HEIGHT = 24;
  it('타임라인 14:50 ~ 15:10', () => {
    //given
    const startDateTimeStr = '2024-05-06T05:50:00Z';
    const endDateTimeStr = '2024-05-06T06:10:00Z';
    const localStartHour = 14;
    const localStartMinute = 50;
    const localEndHour = 15;
    const localEndMinute = 10;
    const executionTime = 1200;

    const {timelinePositions, widestTimelineOrdinary} = getTimelinePosition(
      startDateTimeStr,
      endDateTimeStr,
      localStartHour,
      localStartMinute,
      localEndHour,
      localEndMinute,
      executionTime,
    );

    //when
    const expectTimelinePosition: TimelinePositionType = [
      {width: 10 * 1.5, top: 9 * TIMELINE_HEIGHT + 9, left: 50 * 1.5 + 10},
      {width: 10 * 1.5, top: 10 * TIMELINE_HEIGHT + 10, left: 10},
    ];

    //then
    expect(timelinePositions).toEqual(expectTimelinePosition);
    expect(widestTimelineOrdinary).toEqual(1);
  });

  it('타임라인 14:50 ~ 16:10', () => {
    //given
    const startDateTimeStr = '2024-05-06T05:50:00Z';
    const endDateTimeStr = '2024-05-06T07:10:00Z';
    const localStartHour = 14;
    const localStartMinute = 50;
    const localEndHour = 16;
    const localEndMinute = 10;
    const executionTime = 4800;

    const {timelinePositions, widestTimelineOrdinary} = getTimelinePosition(
      startDateTimeStr,
      endDateTimeStr,
      localStartHour,
      localStartMinute,
      localEndHour,
      localEndMinute,
      executionTime,
    );

    //when
    const expectTimelinePosition: TimelinePositionType = [
      {width: 10 * 1.5, top: 9 * TIMELINE_HEIGHT + 9, left: 50 * 1.5 + 10},
      {width: 60 * 1.5, top: 10 * TIMELINE_HEIGHT + 10, left: 10},
      {width: 10 * 1.5, top: 11 * TIMELINE_HEIGHT + 11, left: 10},
    ];

    //then
    expect(timelinePositions).toEqual(expectTimelinePosition);
    expect(widestTimelineOrdinary).toEqual(2);
  });

  it('타임라인 14:50 ~ 15:00', () => {
    //given
    const startDateTimeStr = '2024-05-06T05:50:00Z';
    const endDateTimeStr = '2024-05-06T06:00:00Z';
    const localStartHour = 14;
    const localStartMinute = 50;
    const localEndHour = 15;
    const localEndMinute = 0;
    const executionTime = 600;

    const {timelinePositions, widestTimelineOrdinary} = getTimelinePosition(
      startDateTimeStr,
      endDateTimeStr,
      localStartHour,
      localStartMinute,
      localEndHour,
      localEndMinute,
      executionTime,
    );

    //when
    const expectTimelinePosition: TimelinePositionType = [
      {width: 10 * 1.5, top: 9 * TIMELINE_HEIGHT + 9, left: 50 * 1.5 + 10},
    ];

    //then
    expect(timelinePositions).toEqual(expectTimelinePosition);
    expect(widestTimelineOrdinary).toEqual(1);
  });

  it('타임라인 14:50 ~ 15:30', () => {
    //given
    const startDateTimeStr = '2024-05-06T05:50:00Z';
    const endDateTimeStr = '2024-05-06T06:30:00Z';
    const localStartHour = 14;
    const localStartMinute = 50;
    const localEndHour = 15;
    const localEndMinute = 30;
    const executionTime = 2400;

    const {timelinePositions, widestTimelineOrdinary} = getTimelinePosition(
      startDateTimeStr,
      endDateTimeStr,
      localStartHour,
      localStartMinute,
      localEndHour,
      localEndMinute,
      executionTime,
    );

    //when
    const expectTimelinePosition: TimelinePositionType = [
      {width: 10 * 1.5, top: 9 * TIMELINE_HEIGHT + 9, left: 50 * 1.5 + 10},
      {width: 30 * 1.5, top: 10 * TIMELINE_HEIGHT + 10, left: 10},
    ];

    //then
    expect(timelinePositions).toEqual(expectTimelinePosition);
    expect(widestTimelineOrdinary).toEqual(2);
  });

  it('타임라인 14:00 ~ 16:00', () => {
    //given
    const startDateTimeStr = '2024-05-06T05:00:00Z';
    const endDateTimeStr = '2024-05-06T07:00:00Z';
    const localStartHour = 14;
    const localStartMinute = 0;
    const localEndHour = 16;
    const localEndMinute = 0;
    const executionTime = 7200;

    const {timelinePositions, widestTimelineOrdinary} = getTimelinePosition(
      startDateTimeStr,
      endDateTimeStr,
      localStartHour,
      localStartMinute,
      localEndHour,
      localEndMinute,
      executionTime,
    );

    //when
    const expectTimelinePosition: TimelinePositionType = [
      {width: 60 * 1.5, top: 9 * TIMELINE_HEIGHT + 9, left: 10},
      {width: 60 * 1.5, top: 10 * TIMELINE_HEIGHT + 10, left: 10},
    ];

    //then
    console.log(timelinePositions, 'timelinePositions');
    console.log(expectTimelinePosition, 'expectTimelinePosition');
    expect(timelinePositions).toEqual(expectTimelinePosition);
    expect(widestTimelineOrdinary).toEqual(1);
  });
});
