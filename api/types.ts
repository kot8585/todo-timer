import dayjs from 'dayjs';

export type TodoType = {
  idx: number;
  userUid: string;
  categoryIdx: number;
  title: string;
  startDate: string;
  isCompleted: boolean;
  executionTime: number;
  createdAt: string;
  updatedAt: string;
  color: string;
};

export type CreateTodoType = {
  userUid: string;
  categoryIdx: number;
  title: string;
  startDate: string;
  color: string;
};

export type UpdateTodoType = {
  idx: number;
  userUid: string;
  categoryIdx: number;
  title: string;
  startDate: string;
  isCompleted: boolean;
  executionTime: number;
};

export type CategoryType = {
  idx: number;
  userUid: string;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  todos: TodoType[];
};

export type TimelineType = {
  idx: number;
  // 이거 string 맞나!!
  todoIdx: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  elapsedTime: number;
  todoTitle: string;
  todoColor: string;
};

export type CreateTimelineType = {
  todoIdx: number;
  startDateTime: dayjs.Dayjs;
  endDateTime: dayjs.Dayjs;
  elapsedTime: number;
  action: 'stop' | 'complete';
};

export type UpdateTimelineRequest = {
  idx: number;
  todoIdx: number;
  startDateTime: dayjs.Dayjs;
  endDateTime: dayjs.Dayjs;
  elapsedTime: number;
};
