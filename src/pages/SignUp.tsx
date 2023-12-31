import { Button } from '@mui/joy'
import { AxiosError } from 'axios'
import React, { FormEvent, useState } from 'react'

import { FieldInfo } from '../components/Form/FormField'
import { toast } from '../components/Toaster/toast'
import UserForm from '../components/UserForm/UserForm'
import userService, { CreateUserParamError } from '../services/userService'
import Paths from '../utils/constants/navigation'

const SignUp: React.FC = () => {
  const [emailAddressFieldInfo, setEmailAddressFieldInfo] = useState<FieldInfo>(
    {
      value: '',
    },
  )
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

  const canSubmit: boolean =
    submissionStatus !== SubmissionStatus.submitting &&
    emailAddressFieldInfo.value.length > 0 &&
    usernameFieldInfo.value.length > 0 &&
    passwordFieldInfo.value.length > 0 &&
    confirmPasswordFieldInfo.value.length > 0 &&
    emailAddressFieldInfo.errorMessage === undefined &&
    usernameFieldInfo.errorMessage === undefined &&
    passwordFieldInfo.errorMessage === undefined &&
    confirmPasswordFieldInfo.errorMessage === undefined

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await submit()
  }

  async function submit() {
    setSubmissionStatus(SubmissionStatus.submitting)

    try {
      await userService.createUser({
        username: usernameFieldInfo.value,
        emailAddress: emailAddressFieldInfo.value,
        password: passwordFieldInfo.value,
      })

      setSubmissionStatus(SubmissionStatus.succeeded)

      toast.success('Sign up successful.')
    } catch (error) {
      if (isErrorCauseByInvalidParams(error)) {
        updateParamErrorMessages((error as AxiosError).response?.data ?? {})
        toast.error('Sign up failed: One or more fields are invalid.')
      } else {
        toast.error('Sign up failed: Please try again later.')
      }

      setSubmissionStatus(SubmissionStatus.failed)
    }
  }

  function isErrorCauseByInvalidParams(error: unknown): boolean {
    return error instanceof AxiosError && error.response?.status === 400
  }

  function updateParamErrorMessages(paramError: CreateUserParamError) {
    setEmailAddressFieldInfo({
      value: emailAddressFieldInfo.value,
      errorMessage: paramError.emailAddress,
    })
    setUsernameFieldInfo({
      value: usernameFieldInfo.value,
      errorMessage: paramError.username,
    })
    setPasswordFieldInfo({
      value: passwordFieldInfo.value,
      errorMessage: paramError.password,
    })
  }

  return (
    <UserForm.Container>
      {submissionStatus === SubmissionStatus.succeeded ? (
        <UserForm.SuccessMessage
          title="Sign Up Successful!"
          linkLeadingMessage="You can now"
          linkMessage="Login"
          linkPath={Paths.Login}
        />
      ) : (
        <UserForm onSubmit={canSubmit ? handleSubmit : undefined}>
          <UserForm.Header
            title="Welcome to PeerPrep! 👋🏼"
            message={[
              'Hello, I guess you are new around here.',
              "Let's start by creating your account!",
            ]}
          />
          <UserForm.EmailAddressField
            fieldInfo={emailAddressFieldInfo}
            setFieldInfo={setEmailAddressFieldInfo}
          />
          <UserForm.UsernameField
            fieldInfo={usernameFieldInfo}
            setFieldInfo={setUsernameFieldInfo}
          />
          <UserForm.PasswordField
            fieldInfo={passwordFieldInfo}
            setFieldInfo={setPasswordFieldInfo}
          />
          <UserForm.ConfirmPasswordField
            fieldInfo={confirmPasswordFieldInfo}
            setFieldInfo={setConfirmPasswordFieldInfo}
            passwordFieldInfo={passwordFieldInfo}
          />

          <Button
            disabled={!canSubmit}
            loading={submissionStatus === SubmissionStatus.submitting}
            type="submit"
          >
            Create an account
          </Button>

          <UserForm.Footer
            leadingMessage="Already have an account?"
            linkMessage="Login"
            linkPath={Paths.Login}
          />
        </UserForm>
      )}
    </UserForm.Container>
  )
}

enum SubmissionStatus {
  yetToSubmit,
  submitting,
  succeeded,
  failed,
}

export default SignUp
