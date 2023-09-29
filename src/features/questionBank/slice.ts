import { createSlice } from '@reduxjs/toolkit'

import { QuestionBankState } from './types'

const initialState: QuestionBankState = {
  questionsList: [],
}

const questionBankSlice = createSlice({
  name: 'questionBank',
  initialState,
  reducers: {
    setQuestionsList: (state, action) => {
      state.questionsList = action.payload
    },
  },
})

export const { setQuestionsList } = questionBankSlice.actions

export default questionBankSlice.reducer
