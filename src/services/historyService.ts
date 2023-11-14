import axios from 'axios'

import { historyServiceBaseUrl, isDevEnv } from '../utils/config'

async function getAllUserAttempts(): Promise<Attempt[]> {
  const res = await axios.get(historyServiceBaseUrl, {
    withCredentials: isDevEnv,
  })
  return res.data.data ?? []
}

async function getUserAttemptCode(attemptId: string): Promise<string> {
  const res = await axios.get(`${historyServiceBaseUrl}/all/${attemptId}`, {
    withCredentials: isDevEnv,
  })
  return res.data.data ?? ''
}
async function getEveryUsersAttempts(): Promise<AttemptCount[]> {
  const res = await axios.get(`${historyServiceBaseUrl}/all`, {
    withCredentials: isDevEnv,
  })
  return res.data.data ?? []
}

export interface Attempt {
  readonly attemptId: string
  readonly questionId: string
  readonly language: string
  readonly date: string
}

export interface AttemptCount {
  readonly 'user-id': number
  readonly attempt_count: number
}

export default {
  getAllUserAttempts,
  getUserAttemptCode,
  getEveryUsersAttempts,
}
