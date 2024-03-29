import dayjs from 'dayjs';

export type TodoType = {
  idx: number;
  userUid: string;
  categoryIdx: number;
  title: string;
  startDate: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  color: string;
  executionTime: number;
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
  executionTime: number;
  createdAt: string;
  updatedAt: string;
  data: TodoType[];
};

export type GetCategoryAndTodosResponse = {
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
  executionTime: number;
  todoTitle: string;
  todoColor: string;
};

export type CreateTimelineType = {
  todoIdx: number;
  startDateTime: dayjs.Dayjs;
  endDateTime: dayjs.Dayjs;
  executionTime: number;
  action: 'stop' | 'complete';
};

export type UpdateTimelineRequest = {
  idx: number;
  todoIdx: number;
  startDateTime: dayjs.Dayjs;
  endDateTime: dayjs.Dayjs;
  executionTime: number;
};

export type CreateCategoryType = {
  userUid?: string;
  title: string;
  color: string;
};

export type UpdateCategoryType = {
  idx: number;
  title?: string;
  color?: string;
  endDate?: string;
};
