export interface ChatState {
  messages: Message[]
  isChannelOn: boolean // refers to saga event channel
  isServerOn: boolean // refers to ws server connection
}

export interface Message {
  username: string
  content: string
  type: MessageType
  timestamp: string
}

export interface DraftMessage extends Omit<Message, 'type'> {
  // No need to specify additional properties, 'type' is excluded
}

export enum MessageType {
  Sent = 'sent',
  Received = 'received',
  System = 'system',
}

export const ChatSagaActions = {
  START_ROOM_CHAT_WS: '@chat/START_ROOM_CHAT_WS',
  STOP_ROOM_CHAT_WS: '@chat/STOP_ROOM_CHAT_WS',
  SEND_MESSAGE: '@chat/SEND_MESSAGE',
}

export interface ReceivedMessageResponse {
  message: string
  userName: string
}

export enum EmittedEvent {
  ReceivedMessage = 'receiveMessage',
  JoinedChat = 'joinRoom',
  LeftChat = 'leftRoom',
}

export interface WsEvent<T> {
  type: EmittedEvent
  payload: T
}
