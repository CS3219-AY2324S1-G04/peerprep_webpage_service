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

export interface SignUpFormInfoState {
  email: FieldInfo
  username: FieldInfo
  password: FieldInfo
  confirmPassword: FieldInfo
  submissionStatus: SubmissionStatus
}

export interface ServerParamErrorInfo {
  email?: string
  username?: string
  password?: string
}
