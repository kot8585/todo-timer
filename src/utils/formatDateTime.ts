import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function getToday() {
  //오전 5시 이전이면 전날로 세팅해야함
  const day = dayjs();

  console.log('날짜', day.get('hour'), day);
  if (day.get('hour') < 5) {
    return day
      .subtract(1, 'day')
      .set('hour', 5)
      .set('minutes', 0)
      .set('seconds', 0);
  } else {
    return day.set('hour', 5).set('minutes', 0).set('seconds', 0);
  }
}

export function formatTime(seconds: number): string {
  return dayjs().startOf('day').add(seconds, 'second').format('HH:mm:ss');
}

export function convertLocalToUtc(localTime: dayjs.Dayjs) {
  return dayjs.utc(localTime).format();
}
