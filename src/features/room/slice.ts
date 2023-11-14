import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RoomModel } from '../../services/roomService'
import { Question } from '../questionBank/types'
import { RoomState, RoomStatus } from './types'

const initialState: RoomState = {
  status: RoomStatus.Pending,
  roomData: undefined,
  questionData: undefined,
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    openRoom: (
      state: RoomState,
      { payload: room }: PayloadAction<RoomModel>,
    ) => {
      state.status = RoomStatus.Open
      state.roomData = room
    },
    closeRoom: (state: RoomState) => {
      state.status = RoomStatus.Pending
      state.roomData = undefined
      state.questionData = undefined
    },
    setQuestionData: (
      state: RoomState,
      { payload: question }: PayloadAction<Question>,
    ) => {
      state.questionData = question
    },
    setRoomExpiry: (
      state: RoomState,
      { payload: expiry }: PayloadAction<string>,
    ) => {
      state.roomExpiry = expiry
    },
  },
})

export const { openRoom, closeRoom, setQuestionData, setRoomExpiry } =
  roomSlice.actions

export default roomSlice.reducer
