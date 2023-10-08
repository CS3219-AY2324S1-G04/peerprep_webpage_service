import { Button, Typography } from '@mui/joy'
import { AxiosError, CanceledError } from 'axios'
import { useEffect } from 'react'

import * as userService from '../../../services/userService'
import { FieldInfo, SubmissionStatus } from '../../userForm/types'

let abortController: AbortController

const SubmitButton: React.FC<{
  usernameFieldInfo: FieldInfo
  passwordFieldInfo: FieldInfo
  submissionStatus: SubmissionStatus
  setSubmissionStatus: React.Dispatch<React.SetStateAction<SubmissionStatus>>
}> = ({
  usernameFieldInfo,
  passwordFieldInfo,
  submissionStatus,
  setSubmissionStatus,
}) => {
  async function handleClick() {
    abortController?.abort()
    abortController = new AbortController()

    setSubmissionStatus(SubmissionStatus.submitting)

    try {
      await userService.createSession(
        usernameFieldInfo.value,
        passwordFieldInfo.value,
        abortController,
      )

      setSubmissionStatus(SubmissionStatus.succeeded)
    } catch (e) {
      if (isErrorCauseByAbort(e)) {
        return
      }

      if (isErrorCauseByMismatchedCredentials(e)) {
        setSubmissionStatus(SubmissionStatus.failedErrorKnown)
      } else {
        setSubmissionStatus(SubmissionStatus.failedErrorUnknown)
      }
    }
  }

  function isErrorCauseByAbort(e: unknown): boolean {
    return e instanceof CanceledError
  }

  function isErrorCauseByMismatchedCredentials(e: unknown): boolean {
    return e instanceof AxiosError && e.response?.status === 401
  }

  const ErrorMessage: React.FC = () => {
    let errorMessage: string | undefined = undefined

    if (submissionStatus === SubmissionStatus.failedErrorKnown) {
      errorMessage = 'Incorrect username or password.'
    } else if (submissionStatus === SubmissionStatus.failedErrorUnknown) {
      errorMessage = 'Sorry, please try again later.'
    }

    return errorMessage === undefined ? (
      <></>
    ) : (
      <Typography textAlign="center" color="danger">
        {errorMessage}
      </Typography>
    )
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
          usernameFieldInfo.value.length === 0 ||
          passwordFieldInfo.value.length === 0 ||
          usernameFieldInfo.errorMessage !== undefined ||
          passwordFieldInfo.errorMessage !== undefined
        }
        loading={submissionStatus == SubmissionStatus.submitting}
        onClick={handleClick}
      >
        Sign in
      </Button>

      <ErrorMessage />
    </>
  )
}

export default SubmitButton
