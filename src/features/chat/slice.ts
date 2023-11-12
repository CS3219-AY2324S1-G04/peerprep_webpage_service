import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ChatState, Message } from './types'

const initialState: ChatState = {
  messages: [],
  isChannelOn: false,
  isServerOn: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChannelOn: (state) => {
      state.isChannelOn = true
    },
    setChannelOff: (state) => {
      state.isChannelOn = false
    },
    setServerOn: (state) => {
      state.isServerOn = true
    },
    setServerOff: (state) => {
      state.isServerOn = false
    },
    pushMessage: (state, action: PayloadAction<Message>) => {
      const updated = state.messages
      updated.push(action.payload)
      state.messages = updated
    },
    resetMessages: (state) => {
      state.messages = []
    },
  },
})

export const {
  setChannelOn,
  setChannelOff,
  setServerOn,
  setServerOff,
  pushMessage,
  resetMessages,
} = chatSlice.actions

export default chatSlice.reducer
