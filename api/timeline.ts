import {CreateTimelineType, TimelineType} from './types';
import client from './client';

export async function getTimelines(userUid: string | undefined, date: string) {
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
