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
      timeout: 10000,
      params: {
        userUid: userUid,
        getTodos: true,
        selectedDate: date,
      },
    },
  );

  return response.data;
}

export async function createCategory(category: CreateCategoryType) {
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
