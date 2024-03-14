import client from './client';
import {CategoryType} from './types';

export async function getCategoryAndTodos() {
  const response = await client.get<CategoryType[]>('/categories', {
    params: {
      userUid: 'WouU7QJQKrTyvYXWgXLrgyyf9dh1',
      getTodos: true,
    },
  });

  const todosFieldToData = response.data.map(item => {
    const {todos, ...rest} = item; // todos 필드와 나머지 필드 분리
    return {data: todos, ...rest}; // data 필드와 나머지 필드 합치기
  });

  console.log('필드 변환: ', todosFieldToData);
  return todosFieldToData;
}
