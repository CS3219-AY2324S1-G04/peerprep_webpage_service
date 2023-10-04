import { RootState } from '../../context/store'

export const selectSignUpFormInfo = (state: RootState) => state.signUpFormInfo

export const selectEmailFieldInfo = (state: RootState) =>
  state.signUpFormInfo.email

export const selectUsernameFieldInfo = (state: RootState) =>
  state.signUpFormInfo.username

export const selectPasswordFieldInfo = (state: RootState) =>
  state.signUpFormInfo.password

export const selectConfirmPasswordFieldInfo = (state: RootState) =>
  state.signUpFormInfo.confirmPassword

export const selectSubmissionStatus = (state: RootState) =>
  state.signUpFormInfo.submissionStatus
