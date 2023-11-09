import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Language } from '../../services/questionService'
import { MinimalQuestion, Question, QuestionBankState } from './types'

const initialState: QuestionBankState = {
  questionsList: [],
  categories: [],
  languages: [],
  selectedQuestionId: '',
  fullQuestionMap: {},
}

const questionBankSlice = createSlice({
  name: 'questionBank',
  initialState,
  reducers: {
    setQuestionsList: (
      state: QuestionBankState,
      { payload: questionsList }: PayloadAction<MinimalQuestion[]>,
    ) => {
      state.questionsList = questionsList
    },
    setCategories: (
      state: QuestionBankState,
      { payload: categories }: PayloadAction<string[]>,
    ) => {
      state.categories = categories
    },
    setLanguages: (
      state: QuestionBankState,
      { payload: languages }: PayloadAction<Language[]>,
    ) => {
      state.languages = languages
    },
    setSelectedQuestionId: (
      state: QuestionBankState,
      { payload: selectedQuestionId }: PayloadAction<string>,
    ) => {
      state.selectedQuestionId = selectedQuestionId
    },
    addCachedFullQuestion: (
      state: QuestionBankState,
      { payload: fullQuestion }: PayloadAction<Question>,
    ) => {
      const existingMap = state.fullQuestionMap
      existingMap[fullQuestion._id] = fullQuestion

      state.fullQuestionMap = existingMap
    },
  },
})

export const {
  setQuestionsList,
  setCategories,
  setLanguages,
  setSelectedQuestionId,
  addCachedFullQuestion,
} = questionBankSlice.actions

export default questionBankSlice.reducer
