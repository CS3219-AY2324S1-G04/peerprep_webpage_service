import { RootState } from '../../context/store'

export const getRoomStatus = (state: RootState) => state.room.status

export const getRoomData = (state: RootState) => state.room.roomData

export const getQuestionData = (state: RootState) => state.room.questionData

export const getRoomExpiry = (state: RootState) => state.room.roomExpiry
