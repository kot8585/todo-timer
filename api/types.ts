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

export type CategoryType = {
  idx: number;
  userUid: string;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  todos: TodoType[];
};
