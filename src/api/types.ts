import dayjs from 'dayjs';

export type TodoType = {
  idx: number;
  title: string;
  isCompleted: boolean;
  color: string;
  executionTime: number;
};

export type CreateTodoType = {
  userUid: string;
  categoryIdx: number;
  title: string;
  startDate: string;
  color?: string;
};

export type UpdateTodoType = {
  idx: number;
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
  title: string;
  color: string;
  executionTime: number;
  data: TodoType[];
};

export type TimelineType = {
  idx: number;
  todoIdx: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  executionTime: number;
  todoTitle: string;
  todoColor: string;
};

export type GetTimelineResponse = {
  idx: number;
  todoIdx: number;
  executionTime: number;
  todoTitle: string;
  todoColor: string;
  startDateTime: string;
  endDateTime: string;
};

export type CreateTimelineType = {
  userUid: string;
  todoIdx: number;
  startDateTime: dayjs.Dayjs;
  endDateTime: dayjs.Dayjs;
  executionTime: number;
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
