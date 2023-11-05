import axios from 'axios'

import { isDevEnv, roomServiceBaseUrl } from '../utils/config'

const roomIdKey = 'room-id'
const questionIdKey = 'question-id'

export async function getMatchedRoom(): Promise<RoomModel> {
  const res = await axios.get(`${roomServiceBaseUrl}/room`, {
    withCredentials: isDevEnv,
  })

  const data = res.data

  return {
    roomId: data[roomIdKey],
    questionId: data[questionIdKey],
  }
}

export async function getRoom(roomId: string): Promise<RoomModel> {
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

export async function keepRoomAlive() {
  await axios.patch(`${roomServiceBaseUrl}/room/keep-alive`, undefined, {
    withCredentials: isDevEnv,
  })
}

export interface RoomModel {
  readonly roomId: string
  readonly questionId: string
}
