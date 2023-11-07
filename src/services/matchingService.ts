import axios, { AxiosResponse } from 'axios'

import { QuestionComplexity } from '../features/questionBank/types'
import { isDevEnv, matchingServiceBaseUrl } from '../utils/config'

export const complexity = 'complexity'
export const categoriesKey = 'categories'
export const language = 'language'

export async function checkUserQueueStatus(): Promise<AxiosResponse> {
  const res = await axios.get(`${matchingServiceBaseUrl}/queue/`, {
    withCredentials: isDevEnv,
  })
  return res
}

export async function joinQueue(settings: QueueSettings) {
  await axios.post(`${matchingServiceBaseUrl}/queue/join`, undefined, {
    params: {
      [complexity]: settings.complexity,
      [categoriesKey]: settings.categories,
      [language]: settings.language,
    },
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
}
