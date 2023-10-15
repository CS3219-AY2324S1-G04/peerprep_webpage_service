export enum QuestionComplexity {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface Question {
  _id: number
  title: string
  description?: string
  categories: string[]
  complexity: QuestionComplexity
}

export interface DraftQuestion extends Omit<Question, '_id'> {
  // No need to specify additional properties, 'id' is excluded
}

export interface QuestionBankState {
  questionsList: Question[]
  categories: string[]
}

export const QuestionBankSagaActions = {
  GET_ALL_QUESTIONS: '@questionBank/GET_ALL_QUESTIONS',
  GET_ALL_CATEGORIES: '@questionBank/GET_ALL_CATEGORIES',
}