import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getCategoryAndTodos} from '../api/category';
import {createTodo, deleteTodo, updateTodo} from '../api/todo';
import useUserStore from '../store/userStore';
import dayjs from 'dayjs';

export default function useTodo(selectedDate: dayjs.Dayjs) {
  const queryClient = useQueryClient();
  const user = useUserStore(state => state.user);
  const userUid = user?.uid;

  const getAllTodos = useQuery(
    ['todos', userUid, selectedDate],
    () => {
      return getCategoryAndTodos(userUid, selectedDate);
    },
    {enabled: !!userUid},
  );

  const createTodoMutation = useMutation(createTodo, {
    onError: (error, variables, context) => {
      // 오류 발생 시 처리
      console.log('useMutation 에러', error);
    },
    onSuccess: (data, variables, context) => {
      // 성공 시 처리
      queryClient.invalidateQueries({
        queryKey: ['todos', userUid, selectedDate],
      });
      console.log('createTodoMutation의 selectedDate', selectedDate);
      console.log('useMutation 성공', data);
    },
  });

  const updateTodoMutation = useMutation(updateTodo, {
    onError: (error, variables, context) => {
      // 오류 발생 시 처리
      console.log('useMutation 에러', error);
    },
    onSuccess: (data, variables, context) => {
      // 성공 시 처리
      queryClient.invalidateQueries({
        queryKey: ['todos', userUid, selectedDate],
      });
      console.log('useMutation 성공', data);
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onError: (error, variables, context) => {
      // 오류 발생 시 처리
      console.log('useMutation 에러', error);
    },
    onSuccess: (data, variables, context) => {
      // 성공 시 처리
      queryClient.invalidateQueries({
        queryKey: ['todos', userUid, selectedDate],
      });
      console.log('useMutation 성공', data);
    },
  });

  return {
    getAllTodos,
    createTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
  };
}
