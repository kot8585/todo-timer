import {useMutation, useQueryClient} from 'react-query';
import useUserStore from '../store/userStore';
import {createCategory, deleteCategory, updateCategory} from '../api/category';
import dayjs from 'dayjs';

// query key를 어떤걸로 만들어야 하지...?
export default function useCategory(selectedDate: dayjs.Dayjs) {
  const queryClient = useQueryClient();
  const user = useUserStore(state => state.user);
  const userUid = user?.uid;

  const createCategoryMutation = useMutation(createCategory, {
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

  const updateCategoryMutation = useMutation(updateCategory, {
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

  const deleteCategoryMutation = useMutation(deleteCategory, {
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
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
}
