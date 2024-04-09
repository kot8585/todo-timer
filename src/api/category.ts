import client from './client';
import {
  CreateCategoryType,
  GetCategoryAndTodosResponse,
  UpdateCategoryType,
} from './types';

export async function getCategoryAndTodos(userUid: string, date: string) {
  const response = await client.get<GetCategoryAndTodosResponse[]>(
    '/categories',
    {
      params: {
        userUid: userUid,
        getTodos: true,
        selectedDate: date,
      },
    },
  );

  const todosFieldToData = response.data.map(item => {
    const {todos, ...rest} = item; // todos 필드와 나머지 필드 분리
    return {data: todos, ...rest}; // data 필드와 나머지 필드 합치기
  });

  return todosFieldToData;
}

export async function createCategory(category: CreateCategoryType) {
  category.userUid = 'WouU7QJQKrTyvYXWgXLrgyyf9dh1';
  const response = await client.post<CreateCategoryType>(
    '/categories',
    category,
  );

  return response.data;
}

export async function updateCategory(category: UpdateCategoryType) {
  const response = await client.put<UpdateCategoryType>(
    `/categories/${category.idx}`,
    category,
  );

  return response.data;
}

export async function deleteCategory(categoryIdx: number) {
  const response = await client.delete(`/categories/${categoryIdx}`);

  return response.data;
}
