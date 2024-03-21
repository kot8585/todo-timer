import {CreateTimelineType, TimelineType} from './types';
import client from './client';

export async function getTimelines(date: string) {
  const response = await client.get<TimelineType[]>(`/timelines/${date}`);

  return response.data;
}

export async function createTimeline(timeline: CreateTimelineType) {
  const response = await client.post<TimelineType[]>('/timelines', timeline);

  return response.data;
}
