import axios from 'axios'

import { isDevEnv, roomServiceBaseUrl } from '../utils/config'

export async function getMatchedRoom(): Promise<RoomModel> {
  const roomIdKey = 'room-id'
  const questionIdKey = 'questions-id'

  const data = (
    await axios.get(`${roomServiceBaseUrl}/room/user`, {
      withCredentials: isDevEnv,
    })
  ).data.data

  return {
    roomId: data[roomIdKey],
    questionId: data[questionIdKey],
  }
}

export async function getRoom(roomId: string): Promise<RoomModel> {
  const roomIdKey = 'room-id'
  const questionIdKey = 'questions-id'

  const data = (
    await axios.get(`${roomServiceBaseUrl}/room/${roomId}/info`, {
      withCredentials: isDevEnv,
    })
  ).data.data

  return {
    roomId: data[roomIdKey],
    questionId: data[questionIdKey],
  }
}

export interface RoomModel {
  readonly roomId: string
  readonly questionId: string
}
