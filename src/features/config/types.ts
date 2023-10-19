export class Config {
  private static readonly _nodeEnvEnvVar: string = 'NODE_ENV'

  public readonly isDevEnv: boolean

  public constructor(env: NodeJS.ProcessEnv = process.env) {
    this.isDevEnv = env[Config._nodeEnvEnvVar] === 'development' ?? false
  }
}
