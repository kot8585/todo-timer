import {
  CreateTimelineType,
  GetTimelineResponse,
  TimelineType,
  UpdateTimelineRequest,
} from './types';
import client from './client';

export async function getTimelines(userUid: string | undefined, date: string) {
  console.log('timline조회 요청: ', date);
  const response = await client.get<GetTimelineResponse[]>('/timelines', {
    timeout: 10000,
    params: {
      userUid: userUid,
      date: date,
    },
  });

  return response.data;
}

export async function createTimeline(timeline: CreateTimelineType) {
  console.log('createTimeline데이터', timeline);

  const response = await client.post<TimelineType[]>('/timelines', timeline);

  return response.data;
}

export async function updateTimeline(timeline: UpdateTimelineRequest) {
  const response = await client.put<TimelineType[]>(
    `/timelines/${timeline.idx}`,
    timeline,
  );

  return response.data;
}

export async function deleteTimeline(deleteTimelineIdx: number) {
  const response = await client.delete<TimelineType[]>(
    `/timelines/${deleteTimelineIdx}`,
  );

  return response.data;
}
