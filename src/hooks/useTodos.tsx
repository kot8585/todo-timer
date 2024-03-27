import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getCategoryAndTodos} from '../../api/category';
import {deleteTodo} from '../../api/todo';
import useUserStore from '../store/userStore';

export default function useTodo(selectedDate: string) {
  const queryClient = useQueryClient();
  const user = useUserStore(state => state.user);
  const userUid = user?.uid;
  console.log(
    '실행 --- 왤케 실행을 많이 하지?',
    'userUid: ' + userUid,
    'selectedDate: ' + selectedDate,
  );

  const getAllTodos = useQuery(
    ['todos', userUid, selectedDate],
    () => {
      console.log('getAllTodos 실행');
      return getCategoryAndTodos(userUid, selectedDate);
    },
    {enabled: !!userUid},
  );

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

  return {getAllTodos, deleteTodoMutation};
}
