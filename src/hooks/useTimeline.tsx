import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  createTimeline,
  deleteTimeline,
  getTimelines,
  updateTimeline,
} from '../../api/timeline';
import useUserStore from '../store/userStore';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function useTimeline(selectedDate: string) {
  const queryClient = useQueryClient();

  const user = useUserStore(state => state.user);
  const userUid = user?.uid;

  // 근데 여기다가 state를 넣어버리면 얘가.. 흠..
  const getAllTimeline = useQuery(['timelines', userUid, selectedDate], () => {
    const startDateTime = dayjs(selectedDate)
      .set('hour', 5)
      .set('minute', 0)
      .set('second', 0)
      .utc();
    return getTimelines(userUid, startDateTime);
  });

  const createTimelineMutation = useMutation(createTimeline, {
    onError: (error, variables, context) => {
      // 오류 발생 시 처리
      console.log('useMutation 에러', error);
    },
    onSuccess: (data, variables, context) => {
      // 아니 여기서 date단위로 invalidate를 해야하는데 막혀버렸어
      queryClient.invalidateQueries({
        queryKey: ['timelines', userUid, selectedDate],
      });
      console.log('useMutation 성공', data);
    },
  });

  const updateTimelineMutation = useMutation(updateTimeline, {
    onError: (error, variables, context) => {
      // 오류 발생 시 처리
      console.log('useMutation 에러', error);
    },
    onSuccess: (data, variables, context) => {
      // 성공 시 처리
      queryClient.invalidateQueries({
        queryKey: ['timelines', userUid, selectedDate],
      });
      console.log('useMutation 성공', data);
    },
  });

  const deleteTimelineMutation = useMutation(deleteTimeline, {
    onError: (error, variables, context) => {
      // 오류 발생 시 처리
      console.log('useMutation 에러', error);
    },
    onSuccess: (data, variables, context) => {
      // 성공 시 처리
      queryClient.invalidateQueries({
        queryKey: ['timelines', userUid, selectedDate],
      });
      console.log('useMutation 성공', data);
    },
  });

  return {
    getAllTimeline,
    createTimelineMutation,
    updateTimelineMutation,
    deleteTimelineMutation,
  };
}
