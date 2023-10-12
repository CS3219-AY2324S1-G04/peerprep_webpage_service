import { Button, Sheet, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import { AxiosError, CanceledError } from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'

import { FieldInfo } from '../components/Form/FormField'
import ConfirmPasswordField from '../components/UserForm/ConfirmPasswordField'
import EmailField from '../components/UserForm/EmailField'
import PasswordField from '../components/UserForm/PasswordField'
import UserForm, { SubmissionStatus } from '../components/UserForm/UserForm'
import UserFormFooter from '../components/UserForm/UserFormFooter'
import UserFormHeader from '../components/UserForm/UserFormHeader'
import UserFormSuccessMessage from '../components/UserForm/UserFormSuccessMessage'
import UsernameField from '../components/UserForm/UsernameField'
import userService from '../services/userService'
import Paths from '../utils/constants/navigation'

let abortController: AbortController

const SignUp: React.FC = () => {
  const [emailFieldInfo, setEmailFieldInfo] = useState<FieldInfo>({ value: '' })
  const [usernameFieldInfo, setUsernameFieldInfo] = useState<FieldInfo>({
    value: '',
  })
  const [passwordFieldInfo, setPasswordFieldInfo] = useState<FieldInfo>({
    value: '',
  })
  const [confirmPasswordFieldInfo, setConfirmPasswordFieldInfo] =
    useState<FieldInfo>({ value: '' })

  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(
    SubmissionStatus.yetToSubmit,
  )

  useEffect(() => {
    return () => {
      abortController?.abort()
    }
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await submit()
  }

  // TODO: Rework this using Redux Saga
  async function submit() {
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

  function updateParamErrorMessages(paramErrorInfo: {
    email?: string
    username?: string
    password?: string
  }) {
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

  const canSubmit: boolean =
    submissionStatus !== SubmissionStatus.submitting &&
    emailFieldInfo.value.length > 0 &&
    usernameFieldInfo.value.length > 0 &&
    passwordFieldInfo.value.length > 0 &&
    confirmPasswordFieldInfo.value.length > 0 &&
    emailFieldInfo.errorMessage === undefined &&
    usernameFieldInfo.errorMessage === undefined &&
    passwordFieldInfo.errorMessage === undefined &&
    confirmPasswordFieldInfo.errorMessage === undefined

  return (
    <Box sx={styles.overallContainer}>
      <Sheet variant="soft" sx={styles.sheet}>
        {submissionStatus === SubmissionStatus.succeeded ? (
          <UserFormSuccessMessage
            title="Sign Up Successful!"
            linkLeadingMessage="You can now"
            linkMessage="Login"
            linkPath={Paths.Login}
          />
        ) : (
          <UserForm onSubmit={canSubmit ? handleSubmit : undefined}>
            <UserFormHeader
              title="Welcome to PeerPrep! 👋🏼"
              message={[
                'Hello, I guess you are new around here.',
                "Let's start by creating your account!",
              ]}
            />
            <EmailField
              fieldInfo={emailFieldInfo}
              setFieldInfo={setEmailFieldInfo}
            />
            <UsernameField
              fieldInfo={usernameFieldInfo}
              setFieldInfo={setUsernameFieldInfo}
            />
            <PasswordField
              fieldInfo={passwordFieldInfo}
              setFieldInfo={setPasswordFieldInfo}
            />
            <ConfirmPasswordField
              fieldInfo={confirmPasswordFieldInfo}
              setFieldInfo={setConfirmPasswordFieldInfo}
              passwordFieldInfo={passwordFieldInfo}
            />

            <Button
              disabled={!canSubmit}
              loading={submissionStatus == SubmissionStatus.submitting}
              type="submit"
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
            <UserFormFooter
              leadingMessage="Already have an account?"
              linkMessage="Login"
              linkPath={Paths.Login}
            />
          </UserForm>
        )}
      </Sheet>
    </Box>
  )
}

const styles = {
  overallContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '50px 0px',
  },
  sheet: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '510px',
    padding: '48px 0px',
    boxShadow: 'sm',
    borderRadius: 'sm',
  },
} as const

export default SignUp
