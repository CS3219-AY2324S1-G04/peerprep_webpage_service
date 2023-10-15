import { RootState } from '../../context/store'

export const getQuestionsList = (state: RootState) =>
  state.questionBank.questionsList

export const getCategories = (state: RootState) => state.questionBank.categories
