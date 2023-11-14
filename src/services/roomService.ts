import axios from 'axios'

import { isDevEnv, roomServiceBaseUrl } from '../utils/config'

const roomIdKey = 'room-id'
const questionIdKey = 'question-id'
const langSlugKey = 'question-lang-slug'
const expireKey = 'expire-at'

export async function getMatchedRoom(): Promise<RoomModel> {
  const res = await axios.get(`${roomServiceBaseUrl}/room`, {
    withCredentials: isDevEnv,
  })

  const data = res.data

  return {
    roomId: data[roomIdKey],
    questionId: data[questionIdKey],
    langSlug: data[langSlugKey],
  }
}

export async function keepAlive(): Promise<Date> {
  const res = await axios.patch(
    `${roomServiceBaseUrl}/room/keep-alive`,
    undefined,
    {
      withCredentials: isDevEnv,
    },
  )

  return new Date(res.data[expireKey])
}

export interface RoomModel {
  readonly roomId: string
  readonly questionId: string
  readonly langSlug: string
}
