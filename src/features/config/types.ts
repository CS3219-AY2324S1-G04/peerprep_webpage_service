export class Config {
  private static readonly _nodeEnvEnvVar: string = 'NODE_ENV'
  private static readonly _gatewayBaseUrlEnvVar: string = 'GATEWAY_BASE_URL'
  private static readonly _userServiceBaseUrlEnvVar: string =
    'USER_SERVICE_BASE_URL'

  private static readonly _defaultIsDevEnv: boolean = false
  private static readonly _defaultUserServiceBaseUrl: string =
    'http://localhost:3000'

  public readonly isDevEnv: boolean
  public readonly userServiceBaseUrl: string

  public constructor(env: NodeJS.ProcessEnv = process.env) {
    this.isDevEnv =
      env[Config._nodeEnvEnvVar] === 'development' ?? Config._defaultIsDevEnv

    this.userServiceBaseUrl =
      env[Config._userServiceBaseUrlEnvVar] ??
      env[Config._gatewayBaseUrlEnvVar] ??
      Config._defaultUserServiceBaseUrl
  }
}
