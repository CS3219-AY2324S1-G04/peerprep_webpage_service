import axios, { AxiosResponse } from 'axios'

import { isDevEnv, matchingServiceBaseUrl } from '../utils/config'
import { QuestionComplexity } from '../features/questionBank/types'

export const difficultyKey = 'difficulty'
export const categoriesKey = 'categories'

export async function checkUserQueueStatus(): Promise<AxiosResponse> {
  const res = await axios.get(`${matchingServiceBaseUrl}/queue`, {
    withCredentials: isDevEnv,
  })
  return res
}

export async function joinQueue(settings: QueueSettings) {
  await axios.post(`${matchingServiceBaseUrl}/queue/join`, undefined, {
    params: {
      [difficultyKey]: settings.difficulty,
      [categoriesKey]: settings.categories,
    },
    withCredentials: isDevEnv,
  })
}

export interface QueueSettings {
  readonly difficulty: QuestionComplexity
  readonly categories: string[]
}

export default {
  checkUserQueueStatus,
  joinQueue
}
