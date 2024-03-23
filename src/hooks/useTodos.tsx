import {useQuery} from 'react-query';
import {getCategoryAndTodos} from '../../api/category';
import useUserStore from '../store/userStore';

export default function useTodo() {
  const user = useUserStore(state => state.user);
  const userUid = user?.uid;
  console.log('userUid: ' + userUid);

  const getAllTodos = useQuery(
    ['todos', userUid],
    () => getCategoryAndTodos(userUid),
    // {enabled: !!userUid},
  );

  return {getAllTodos};
}
