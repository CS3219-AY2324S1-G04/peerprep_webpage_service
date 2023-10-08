export interface FieldInfo {
  value: string
  errorMessage?: string
}

export enum SubmissionStatus {
  yetToSubmit,
  submitting,
  succeeded,
  failedErrorUnknown,
  failedErrorKnown,
}

export interface ServerParamErrorInfo {
  email?: string
  username?: string
  password?: string
}
