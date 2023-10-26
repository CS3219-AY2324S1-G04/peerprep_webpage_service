import { QuestionComplexity } from '../features/questionBank/types'

export const getComplexityColor = (qnsComplexity: QuestionComplexity) => {
  switch (qnsComplexity) {
    case QuestionComplexity.Easy:
      return 'success'
    case QuestionComplexity.Medium:
      return 'warning'
    default:
      return 'danger'
  }
}

export const parseStringToComplexityEnum = (value: string) => {
  if (Object.values(QuestionComplexity).includes(value as QuestionComplexity)) {
    return value as QuestionComplexity
  }
  return QuestionComplexity.Easy
}
