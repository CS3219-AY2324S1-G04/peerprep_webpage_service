import { Button, Typography } from '@mui/joy'
import { AxiosError, CanceledError } from 'axios'
import { useEffect } from 'react'

import * as userService from '../../../services/userService'
import { FieldInfo, ServerParamErrorInfo, SubmissionStatus } from '../types'

let abortController: AbortController

const SubmitButton: React.FC<{
  emailFieldInfo: FieldInfo
  setEmailFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  usernameFieldInfo: FieldInfo
  setUsernameFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  passwordFieldInfo: FieldInfo
  setPasswordFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  confirmPasswordFieldInfo: FieldInfo
  submissionStatus: SubmissionStatus
  setSubmissionStatus: React.Dispatch<React.SetStateAction<SubmissionStatus>>
}> = ({
  emailFieldInfo,
  setEmailFieldInfo,
  usernameFieldInfo,
  setUsernameFieldInfo,
  passwordFieldInfo,
  setPasswordFieldInfo,
  confirmPasswordFieldInfo,
  submissionStatus,
  setSubmissionStatus,
}) => {
  async function handleClick() {
    abortController?.abort()
    abortController = new AbortController()

    setSubmissionStatus(SubmissionStatus.submitting)

    try {
      await userService.createUser(
        usernameFieldInfo.value,
        emailFieldInfo.value,
        passwordFieldInfo.value,
        abortController,
      )

      setSubmissionStatus(SubmissionStatus.succeeded)
    } catch (e) {
      if (isErrorCauseByAbort(e)) {
        return
      }

      if (isErrorCauseByInvalidParams(e)) {
        setSubmissionStatus(SubmissionStatus.failedErrorKnown)
        updateParamErrorMessages((e as AxiosError).response?.data ?? {})
      } else {
        setSubmissionStatus(SubmissionStatus.failedErrorUnknown)
      }
    }
  }

  function isErrorCauseByAbort(e: unknown): boolean {
    return e instanceof CanceledError
  }

  function isErrorCauseByInvalidParams(e: unknown): boolean {
    return e instanceof AxiosError && e.response?.status === 400
  }

  function updateParamErrorMessages(paramErrorInfo: ServerParamErrorInfo) {
    setEmailFieldInfo({
      value: emailFieldInfo.value,
      errorMessage: paramErrorInfo.email,
    })
    setUsernameFieldInfo({
      value: usernameFieldInfo.value,
      errorMessage: paramErrorInfo.username,
    })
    setPasswordFieldInfo({
      value: passwordFieldInfo.value,
      errorMessage: paramErrorInfo.password,
    })
  }

  useEffect(() => {
    return () => {
      abortController?.abort()
    }
  }, [])

  return (
    <>
      <Button
        disabled={
          emailFieldInfo.value.length === 0 ||
          usernameFieldInfo.value.length === 0 ||
          passwordFieldInfo.value.length === 0 ||
          confirmPasswordFieldInfo.value.length === 0 ||
          emailFieldInfo.errorMessage !== undefined ||
          usernameFieldInfo.errorMessage !== undefined ||
          passwordFieldInfo.errorMessage !== undefined ||
          confirmPasswordFieldInfo.errorMessage !== undefined
        }
        loading={submissionStatus == SubmissionStatus.submitting}
        onClick={handleClick}
      >
        Create an account
      </Button>

      {submissionStatus == SubmissionStatus.failedErrorUnknown ? (
        <Typography textAlign="center" color="danger">
          Sorry, please try again later.
        </Typography>
      ) : (
        <></>
      )}
    </>
  )
}

export default SubmitButton
