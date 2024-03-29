import client from './client';
import {GetCategoryAndTodosResponse} from './types';

export async function getCategoryAndTodos(userUid: string, date: string) {
  console.log('datedate', date);
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

  console.log('필드 변환: ', todosFieldToData);
  return todosFieldToData;
}
