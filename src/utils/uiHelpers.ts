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
