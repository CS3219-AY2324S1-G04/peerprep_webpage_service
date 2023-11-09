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

export const validateStringInput = (
  value: string,
  inputLabel: string,
  customErrorMessage?: string,
): string | undefined => {
  if (value === '' || value.length < 1) {
    if (customErrorMessage) return customErrorMessage
    return `${inputLabel} is required`
  }
  return
}
