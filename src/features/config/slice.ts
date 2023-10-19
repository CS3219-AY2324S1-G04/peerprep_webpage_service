import { createSlice } from '@reduxjs/toolkit'

import { ConfigState, basePaths, configEnvVars, defaultRootUrls } from './types'

const env = import.meta.env

const initialState: ConfigState = {
  isDevEnv: env[configEnvVars.appMode] === 'development',
  userServiceBaseUrl:
    (env[configEnvVars.userServiceRootUrl] ??
      env[configEnvVars.gatewayRootUrl] ??
      defaultRootUrls.userServiceRootUrl) + basePaths.userServiceBasePath,
  questionServiceBaseUrl:
    (env[configEnvVars.questionServiceRootUrl] ??
      env[configEnvVars.gatewayRootUrl] ??
      defaultRootUrls.questionServiceRootUrl) +
    basePaths.questionServiceBasePath,
  matchingServiceBaseUrl:
    (env[configEnvVars.matchingServiceRootUrl] ??
      env[configEnvVars.gatewayRootUrl] ??
      defaultRootUrls.matchingServiceRootUrl) +
    basePaths.matchingServiceBasePath,
  roomServiceBaseUrl:
    (env[configEnvVars.roomServiceRootUrl] ??
      env[configEnvVars.gatewayRootUrl] ??
      defaultRootUrls.roomServiceRootUrl) + basePaths.roomServiceBasePath,
  editorServiceBaseUrl:
    (env[configEnvVars.editorServiceRootUrl] ??
      env[configEnvVars.gatewayRootUrl] ??
      defaultRootUrls.editorServiceRootUrl) + basePaths.editorServiceBasePath,
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
})

export default configSlice.reducer
