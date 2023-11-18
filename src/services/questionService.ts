import axios from 'axios'

import { DraftQuestion, Question } from '../features/questionBank/types'
import { isDevEnv, questionServiceBaseUrl } from '../utils/config'

export const titleKey = 'title'
export const descriptionKey = 'description'
export const complexityKey = 'complexity'
export const categoriesKey = 'categories'
export const templateKey = 'template'

export async function fetchLanguages(): Promise<Language[]> {
  const data = (
    await axios.get(`${questionServiceBaseUrl}/languages`, {
      withCredentials: isDevEnv,
    })
  ).data.data
  return data ?? []
}

export async function createQuestion(question: DraftQuestion): Promise<void> {
  await axios.post(
    `${questionServiceBaseUrl}/questions`,
    {
      [titleKey]: question.title,
      [descriptionKey]: question.description,
      [complexityKey]: question.complexity,
      [categoriesKey]: question.categories,
      [templateKey]: question.template,
    },
    {
      withCredentials: isDevEnv,
    },
  )
}

export async function deleteQuestion(id: string): Promise<void> {
  await axios.delete(`${questionServiceBaseUrl}/questions/${id}`, {
    withCredentials: isDevEnv,
  })
}

export async function updateQuestion(question: Question): Promise<void> {
  await axios.put(
    `${questionServiceBaseUrl}/questions/${question._id}`,
    {
      [titleKey]: question.title,
      [descriptionKey]: question.description,
      [complexityKey]: question.complexity,
      [categoriesKey]: question.categories,
      [templateKey]: question.template,
    },
    {
      withCredentials: isDevEnv,
    },
  )
}

export interface Language {
  readonly language: string
  readonly langSlug: string
}

export interface Template {
  readonly language: string
  readonly langSlug: string
  readonly code: string
}

export default {
  fetchLanguages,
  createQuestion,
  deleteQuestion,
  updateQuestion,
}
