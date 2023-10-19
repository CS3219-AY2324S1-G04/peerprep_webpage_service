import { RootState } from '../../context/store'

export const getConfig = (state: RootState) => state.config

export const getIsDevEnv = (state: RootState) => state.config.isDevEnv
export const getUserServiceBaseUrl = (state: RootState) =>
  state.config.userServiceBaseUrl
