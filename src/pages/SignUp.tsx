import { Button } from '@mui/joy'
import { AxiosError } from 'axios'
import React, { FormEvent, useState } from 'react'

import { FieldInfo } from '../components/Form/FormField'
import ConfirmPasswordField from '../components/UserForm/ConfirmPasswordField'
import EmailField from '../components/UserForm/EmailField'
import PasswordField from '../components/UserForm/PasswordField'
import UserForm from '../components/UserForm/UserForm'
import UserFormContainer from '../components/UserForm/UserFormContainer'
import UserFormFooter from '../components/UserForm/UserFormFooter'
import UserFormHeader from '../components/UserForm/UserFormHeader'
import UserFormSuccessMessage from '../components/UserForm/UserFormSuccessMessage'
import UsernameField from '../components/UserForm/UsernameField'
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
    } catch (e) {
      if (isErrorCauseByInvalidParams(e)) {
        updateParamErrorMessages((e as AxiosError).response?.data ?? {})
      } else {
        // TODO: Show toast / snackbar containing error message
        console.error('Sorry, please try again later.')
      }

      setSubmissionStatus(SubmissionStatus.failed)
    }
  }

  function isErrorCauseByInvalidParams(e: unknown): boolean {
    return e instanceof AxiosError && e.response?.status === 400
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
    <UserFormContainer>
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
            fieldInfo={emailAddressFieldInfo}
            setFieldInfo={setEmailAddressFieldInfo}
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
            loading={submissionStatus === SubmissionStatus.submitting}
            type="submit"
          >
            Create an account
          </Button>

          <UserFormFooter
            leadingMessage="Already have an account?"
            linkMessage="Login"
            linkPath={Paths.Login}
          />
        </UserForm>
      )}
    </UserFormContainer>
  )
}

enum SubmissionStatus {
  yetToSubmit,
  submitting,
  succeeded,
  failed,
}

export default SignUp
