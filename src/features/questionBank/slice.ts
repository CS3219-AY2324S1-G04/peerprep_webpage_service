import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Question, QuestionBankState } from './types'

const initialState: QuestionBankState = {
  questionsList: [],
  categories: [],
}

const questionBankSlice = createSlice({
  name: 'questionBank',
  initialState,
  reducers: {
    setQuestionsList: (state: QuestionBankState, { payload: questionsList }: PayloadAction<Question[]>) => {
      state.questionsList = questionsList
    },
    setCategories: (state: QuestionBankState, { payload: categories }: PayloadAction<string[]>) => {
      state.categories = categories
    }
  },
})


export const { setQuestionsList, setCategories } = questionBankSlice.actions

export default questionBankSlice.reducer
