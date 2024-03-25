import {useMutation} from 'react-query';
import {createTimeline} from '../../api/timeline';

export default function useTimeline() {
  const createTimelineMutation = useMutation(createTimeline, {
    onError: (error, variables, context) => {
      // 오류 발생 시 처리
      console.log('useMutation 에러', error);
    },
    onSuccess: (data, variables, context) => {
      // 성공 시 처리
      console.log('useMutation 성공', data);
    },
  });
  return {createTimelineMutation};
}
