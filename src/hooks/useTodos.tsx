import {useMutation, useQuery} from 'react-query';
import {getCategoryAndTodos} from '../../api/category';
import useUserStore from '../store/userStore';
import useSelectedDateStore from '../store/selecteDateStore';
import {deleteTodo} from '../../api/todo';

export default function useTodo() {
  // 얘도 date를 상태에서 빼는거야??? 인자로 안주고? useTodo(selectedDate)했는 데 undefined뜸
  const user = useUserStore(state => state.user);
  const userUid = user?.uid;
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
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
      console.log('useMutation 성공', data);
    },
  });

  return {getAllTodos, deleteTodoMutation};
}
