import dayjs from 'dayjs';

export function getToday() {
  //오전 5시 이전이면 전날로 세팅해야함
  const day = dayjs();
  if (day.get('hour') < 5) {
    return day.subtract(1, 'day').format('YYYY-MM-DD');
  } else {
    return day.format('YYYY-MM-DD');
  }
}
