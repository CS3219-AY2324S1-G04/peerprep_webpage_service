import { RootState } from '../../context/store'

export const getConfig = (state: RootState) => state.config

export const getIsDevEnv = (state: RootState) => state.config.isDevEnv

export const getUserServiceBaseUrl = (state: RootState) =>
  state.config.userServiceBaseUrl

export const getQuestionServiceBaseUrl = (state: RootState) =>
  state.config.questionServiceBaseUrl

export const getMatchingServiceBaseUrl = (state: RootState) =>
  state.config.matchingServiceBaseUrl

export const getRoomServiceBaseUrl = (state: RootState) =>
  state.config.roomServiceBaseUrl

export const getEditorServiceBaseUrl = (state: RootState) =>
  state.config.editorServiceBaseUrl
