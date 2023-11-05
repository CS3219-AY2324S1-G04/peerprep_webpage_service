import { RoomModel } from '../../services/roomService'
import { Question } from '../questionBank/types'

const sliceKey = 'room'

export interface RoomState {
  status: RoomStatus
  roomData?: RoomModel
  questionData?: Question
}

export enum RoomStatus {
  Pending,
  Open,
}

export const RoomSagaActions = {
  LOAD_MATCH_ROOM_DATA: `@${sliceKey}/LOAD_MATCH_ROOM`,
  STOP_LOAD_ROOM: `@${sliceKey}/STOP_LOAD_ROOM`,
  CLEAR_ROOM: `@${sliceKey}/CLEAR_ROOM`,
  OPEN_ROOM: `@${sliceKey}/OPEN_ROOM`,
  CLOSE_ROOM: `@${sliceKey}/CLOSE_ROOM`,
  KEEP_ALIVE: `@${sliceKey}/KEEP_ALIVE`,
}
