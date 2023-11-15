import axios, { AxiosResponse } from 'axios'

import { QuestionComplexity } from '../features/questionBank/types'
import { isDevEnv, matchingServiceBaseUrl } from '../utils/config'

export const complexityKey = 'complexity'
export const categoriesKey = 'categories'
export const languageKey = 'language'

async function checkUserQueueStatus(): Promise<AxiosResponse> {
  return await axios.get(`${matchingServiceBaseUrl}/queue`, {
    withCredentials: isDevEnv,
  })
}

async function joinQueue(settings: QueueSettings): Promise<AxiosResponse> {
  return await axios.post(`${matchingServiceBaseUrl}/queue/join`, undefined, {
    params: {
      [complexityKey]: settings.complexity,
      [categoriesKey]: settings.categories,
      [languageKey]: settings.language,
    },
    withCredentials: isDevEnv,
  })
}

async function leaveQueue(): Promise<void> {
  await axios.delete(`${matchingServiceBaseUrl}/queue`, {
    withCredentials: isDevEnv,
  })
}

export interface QueueSettings {
  readonly complexity: QuestionComplexity
  readonly categories: string[]
  readonly language: string
}

export default {
  checkUserQueueStatus,
  joinQueue,
  leaveQueue,
}
