class Config {
  private static _appModeEnvVar: string = 'MODE'
  private static _userServiceRootUrlEnvVar: string =
    'VITE_USER_SERVICE_ROOT_URL'
  private static _questionServiceRootUrlEnvVar: string =
    'VITE_QUESTION_SERVICE_ROOT_URL'
  private static _matchingServiceRootUrlEnvVar: string =
    'VITE_MATCHING_SERVICE_ROOT_URL'
  private static _roomServiceRootUrlEnvVar: string =
    'VITE_ROOM_SERVICE_ROOT_URL'
  private static _editorServiceRootUrlEnvVar: string =
    'VITE_EDITOR_SERVICE_ROOT_URL'
  private static _chatServiceRootUrlEnvVar: string =
    'VITE_CHAT_SERVICE_ROOT_URL'
  private static _historyServiceRootUrlEnvVar: string =
    'VITE_ATTEMPT_HISTORY_SERVICE_ROOT_URL'

  public readonly isDevEnv: boolean
  public readonly userServiceBaseUrl: string
  public readonly questionServiceBaseUrl: string
  public readonly matchingServiceBaseUrl: string
  public readonly roomServiceBaseUrl: string
  public readonly editorServiceBaseUrl: string
  public readonly chatServiceBaseUrl: string
  public readonly historyServiceBaseUrl: string

  public constructor(env: ImportMetaEnv = import.meta.env) {
    this.isDevEnv = env[Config._appModeEnvVar] === 'development'
    this.userServiceBaseUrl = env[Config._userServiceRootUrlEnvVar] ?? ''
    this.questionServiceBaseUrl =
      env[Config._questionServiceRootUrlEnvVar] ?? ''
    this.matchingServiceBaseUrl =
      env[Config._matchingServiceRootUrlEnvVar] ?? ''
    this.roomServiceBaseUrl = env[Config._roomServiceRootUrlEnvVar] ?? ''
    this.editorServiceBaseUrl = env[Config._editorServiceRootUrlEnvVar] ?? ''
    this.chatServiceBaseUrl = env[Config._chatServiceRootUrlEnvVar] ?? ''
    this.historyServiceBaseUrl = env[Config._historyServiceRootUrlEnvVar] ?? ''

    if (this.isDevEnv) {
      console.warn('Running in development mode.')
    }

    if (this.userServiceBaseUrl === '') {
      console.warn('User service base URL was not specified.')
    }
    if (this.questionServiceBaseUrl === '') {
      console.warn('Question service base URL was not specified.')
    }
    if (this.matchingServiceBaseUrl === '') {
      console.warn('Matching service base URL was not specified.')
    }
    if (this.roomServiceBaseUrl === '') {
      console.warn('Room service base URL was not specified.')
    }
    if (this.editorServiceBaseUrl === '') {
      console.warn('Editor service base URL was not specified.')
    }
    if (this.chatServiceBaseUrl === '') {
      console.warn('Chat service base URL was not specified.')
    }
    if (this.historyServiceBaseUrl === '') {
      console.warn('History service base URL was not specified.')
    }
  }
}

const config = new Config()
export default config

export const {
  isDevEnv,
  userServiceBaseUrl,
  questionServiceBaseUrl,
  matchingServiceBaseUrl,
  roomServiceBaseUrl,
  editorServiceBaseUrl,
  chatServiceBaseUrl,
  historyServiceBaseUrl,
} = config
