import client from './client';
import {CreateTodoType, TodoType, UpdateTodoType} from './types';

export async function createTodo(newTodo: CreateTodoType) {
  const response = await client.post<TodoType>('/todos', newTodo);

  return response.data;
}

export async function updateTodo(updateTodo: UpdateTodoType) {
  console.log(updateTodo.idx);
  const response = await client.put<TodoType>(
    `/todos/${updateTodo.idx}`,
    updateTodo,
  );
  console.log('response.request: ', response.request);

  return response.data;
}

export async function deleteTodo(deleteTodoIdx: number) {
  const response = await client.delete<TodoType>(`/todos/${deleteTodoIdx}`);

  return response.data;
}
