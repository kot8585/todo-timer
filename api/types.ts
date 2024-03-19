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
};

export type CreateTodoType = {
  userUid: string;
  categoryIdx: number;
  title: string;
  startDate: string;
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
  startDate: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  durationTime: number;
  todo: TodoType;
};
