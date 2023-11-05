import axios from 'axios'

import { isDevEnv, roomServiceBaseUrl } from '../utils/config'

export async function getMatchedRoom(): Promise<Room> {
  const data = (
    await axios.get(`${roomServiceBaseUrl}/room`, {
      withCredentials: isDevEnv,
    })
  ).data.data

  return {
    roomId: data['room-id'],
    questionId: data['questions-id'],
  }
}

export interface Room {
  readonly roomId: string
  readonly questionId: string
}
