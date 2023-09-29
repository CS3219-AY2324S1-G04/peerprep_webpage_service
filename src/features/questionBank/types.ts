export enum QuestionComplexity {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface Question {
  id: number
  title: string
  description: string
  category: string[]
  complexity: QuestionComplexity
}

export interface DraftQuestion extends Omit<Question, 'id'> {
  // No need to specify additional properties, 'id' is excluded
}

export interface QuestionBankState {
  questionsList: Question[]
}
