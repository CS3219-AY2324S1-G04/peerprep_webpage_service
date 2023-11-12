import { RootState } from '../../context/store'

export const getMessages = (state: RootState) => state.chat.messages
