import { RoomModel } from '../../services/roomService'
import { Question } from '../questionBank/types'

const sliceKey = 'room'

export interface RoomState {
  status: RoomStatus
  roomData?: RoomModel
  questionData?: Question
  roomExpiry?: string
}

export enum RoomStatus {
  Pending,
  Open,
}

export const RoomSagaActions = {
  START_FIND_MATCH_ROOM: `@${sliceKey}/START_FIND_MATCH_ROOM`,
  STOP_FIND_MATCH_ROOM: `@${sliceKey}/STOP_FIND_MATCH_ROOM`,
  START_POLL_MATCH_ROOM: `@${sliceKey}/START_POLL_MATCH_ROOM`,
  STOP_POLL_MATCH_ROOM: `@${sliceKey}/STOP_POLL_MATCH_ROOM`,
  START_KEEP_ALIVE: `@${sliceKey}/START_KEEP_ALIVE`,
  STOP_KEEP_ALIVE: `@${sliceKey}/START_KEEP_ALIVE`,
}
