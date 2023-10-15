import { SimpleMap } from '../../utils/types'

export enum QuestionComplexity {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface Question {
  _id: string
  title: string
  description?: string
  categories: string[]
  complexity: QuestionComplexity
}

export type MinimalQuestion = Omit<Question, 'description'>
export interface DraftQuestion extends Omit<Question, '_id'> {
  // No need to specify additional properties, 'id' is excluded
}

export interface QuestionBankState {
  questionsList: MinimalQuestion[]
  categories: string[]
  selectedQuestionId: string
  fullQuestionMap: SimpleMap<Question>
}

export const QuestionBankSagaActions = {
  GET_ALL_QUESTIONS: '@questionBank/GET_ALL_QUESTIONS',
  GET_ALL_CATEGORIES: '@questionBank/GET_ALL_CATEGORIES',
  SET_SELECTED_QUESTION: 'questionBank/setSelectedQuestionId',
}
