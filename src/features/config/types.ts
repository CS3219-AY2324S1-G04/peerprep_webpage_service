export interface ConfigState {
  isDevEnv: boolean
  userServiceBaseUrl: string
  questionServiceBaseUrl: string
  matchingServiceBaseUrl: string
  roomServiceBaseUrl: string
  editorServiceBaseUrl: string
}

// Root URLs do not contain base path (e.g. "/user-service").
// Base paths are included in the base URLs.
export const configEnvVars = {
  appMode: 'MODE',
  gatewayRootUrl: 'VITE_GATEWAY_ROOT_URL',
  userServiceRootUrl: 'VITE_USER_SERVICE_ROOT_URL',
  questionServiceRootUrl: 'VITE_QUESTION_SERVICE_ROOT_URL',
  matchingServiceRootUrl: 'VITE_MATCHING_SERVICE_ROOT_URL',
  roomServiceRootUrl: 'VITE_ROOM_SERVICE_ROOT_URL',
  editorServiceRootUrl: 'VITE_EDITOR_SERVICE_ROOT_URL',
}

export const defaultRootUrls = {
  userServiceRootUrl: 'http://localhost:9000',
  questionServiceRootUrl: 'http://localhost:9001',
  matchingServiceRootUrl: 'http://localhost:9002',
  roomServiceRootUrl: 'http://localhost:9003',
  editorServiceRootUrl: 'http://localhost:9004',
}

export const basePaths = {
  userServiceBasePath: '/user-service',
  questionServiceBasePath: '/question-service',
  matchingServiceBasePath: '/matching-service',
  roomServiceBasePath: '/room-service',
  editorServiceBasePath: '/editor-service',
}
