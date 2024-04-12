import client from './client';

export async function createInitializeData(userUid: string) {
  const response = await client.post('/', {uid: userUid});

  return response.data;
}
