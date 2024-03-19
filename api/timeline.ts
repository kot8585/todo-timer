import {TimelineType} from './types';
import client from './client';

export async function getTimelines(date: string) {
  const response = await client.get<TimelineType[]>(`/timelines/${date}`);

  return response.data;
}
