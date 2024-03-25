import {CreateTimelineType, TimelineType, UpdateTimelineRequest} from './types';
import client from './client';
import dayjs from 'dayjs';

export async function getTimelines(
  userUid: string | undefined,
  date: dayjs.Dayjs,
) {
  const response = await client.get<TimelineType[]>('/timelines', {
    params: {
      userUid: userUid,
      date: date,
    },
  });

  return response.data;
}

export async function createTimeline(timeline: CreateTimelineType) {
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
