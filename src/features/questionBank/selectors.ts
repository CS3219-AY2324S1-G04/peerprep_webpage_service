import { RootState } from '../../context/store'

export const selectQuestionList = (state: RootState) =>
  state.questionBank.questionsList
