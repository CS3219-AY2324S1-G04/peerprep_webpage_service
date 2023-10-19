export class Config {
  private static readonly _appModeEnvVar: string = 'MODE'
  // If the value for the "VITE_GATEWAY_BASE_URL" env var is specified, it is
  // used as the value for any "*_BASE_URL" env var whose value is not
  // specified.
  private static readonly _gatewayBaseUrlEnvVar: string =
    'VITE_GATEWAY_BASE_URL'
  private static readonly _userServiceBaseUrlEnvVar: string =
    'VITE_USER_SERVICE_BASE_URL'
  private static readonly _questionServiceBaseUrlEnvVar: string =
    'VITE_QUESTION_SERVICE_BASE_URL'
  private static readonly _matchingServiceBaseUrlEnvVar: string =
    'VITE_MATCHING_SERVICE_BASE_URL'
  private static readonly _roomServiceBaseUrlEnvVar: string =
    'VITE_ROOM_SERVICE_BASE_URL'
  private static readonly _editorServiceBaseUrlEnvVar: string =
    'VITE_EDITOR_SERVICE_BASE_URL'

  private static readonly _defaultUserServiceBaseUrl: string =
    'http://localhost:9000'
  private static readonly _defaultQuestionServiceBaseUrl: string =
    'http://localhost:9001'
  private static readonly _defaultMatchingServiceBaseUrl: string =
    'http://localhost:9002'
  private static readonly _defaultRoomServiceBaseUrl: string =
    'http://localhost:9003'
  private static readonly _defaultEditorServiceBaseUrl: string =
    'http://localhost:9004'

  public readonly isDevEnv: boolean
  public readonly userServiceBaseUrl: string
  public readonly questionServiceBaseUrl: string
  public readonly matchingServiceBaseUrl: string
  public readonly roomServiceBaseUrl: string
  public readonly editorServiceBaseUrl: string

  public constructor(env: ImportMetaEnv = import.meta.env) {
    this.isDevEnv = env[Config._appModeEnvVar] === 'development'

    this.userServiceBaseUrl =
      env[Config._userServiceBaseUrlEnvVar] ??
      env[Config._gatewayBaseUrlEnvVar] ??
      Config._defaultUserServiceBaseUrl
    this.questionServiceBaseUrl =
      env[Config._questionServiceBaseUrlEnvVar] ??
      env[Config._gatewayBaseUrlEnvVar] ??
      Config._defaultQuestionServiceBaseUrl
    this.matchingServiceBaseUrl =
      env[Config._matchingServiceBaseUrlEnvVar] ??
      env[Config._gatewayBaseUrlEnvVar] ??
      Config._defaultMatchingServiceBaseUrl
    this.roomServiceBaseUrl =
      env[Config._roomServiceBaseUrlEnvVar] ??
      env[Config._gatewayBaseUrlEnvVar] ??
      Config._defaultRoomServiceBaseUrl
    this.editorServiceBaseUrl =
      env[Config._editorServiceBaseUrlEnvVar] ??
      env[Config._gatewayBaseUrlEnvVar] ??
      Config._defaultEditorServiceBaseUrl

    if (!this.isDevEnv && env[Config._gatewayBaseUrlEnvVar]) {
      console.warn('Gateway URL was not specified for a non-dev environment.')
    }
  }
}
