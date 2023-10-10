import { Box, Button, Sheet, Typography } from '@mui/joy'
import { AxiosError, CanceledError } from 'axios'
import { useEffect, useState } from 'react'

import Form, { SubmissionStatus } from '../components/Form/Form'
import { FieldInfo } from '../components/Form/FormField'
import FormFooter from '../components/Form/FormFooter'
import FormHeader from '../components/Form/FormHeader'
import FormSuccessMessage from '../components/Form/FormSuccessMessage'
import PasswordField from '../components/UserForm/PasswordField'
import UsernameField from '../components/UserForm/UsernameField'
import userService from '../services/userService'
import Paths from '../utils/constants/navigation'

let abortController: AbortController

const Login: React.FC = () => {
  const [usernameFieldInfo, setUsernameFieldInfo] = useState<FieldInfo>({
    value: '',
  })
  const [passwordFieldInfo, setPasswordFieldInfo] = useState<FieldInfo>({
    value: '',
  })

  function getErrorMessage(
    submissionStatus: SubmissionStatus,
  ): string | undefined {
    switch (submissionStatus) {
      case SubmissionStatus.failedErrorKnown: {
        return 'Incorrect username or password.'
      }
      case SubmissionStatus.failedErrorUnknown: {
        return 'Sorry, please try again later.'
      }
      default: {
        return undefined
      }
    }
  }

  return (
    <Box sx={styles.overallContainer}>
      <Sheet variant="soft" sx={styles.sheet}>
        <Box sx={styles.formContainer}>
          <Form
            FormHeader={() => (
              <FormHeader
                title="Log in to your account"
                body={['Welcome back! Please enter your details.']}
              />
            )}
            FormBody={({ submissionStatus, setSubmissionStatus }) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  gap: '24px',
                  width: '100%',
                }}
              >
                <UsernameField
                  fieldInfo={usernameFieldInfo}
                  setFieldInfo={setUsernameFieldInfo}
                  shouldValidate={false}
                />
                <PasswordField
                  fieldInfo={passwordFieldInfo}
                  setFieldInfo={setPasswordFieldInfo}
                  shouldValidate={false}
                />

                <SubmitButton
                  usernameFieldInfo={usernameFieldInfo}
                  passwordFieldInfo={passwordFieldInfo}
                  submissionStatus={submissionStatus}
                  setSubmissionStatus={setSubmissionStatus}
                />

                {getErrorMessage(submissionStatus) === undefined ? null : (
                  <Typography textAlign="center" color="danger">
                    {getErrorMessage(submissionStatus)}
                  </Typography>
                )}
              </Box>
            )}
            FormFooter={() => (
              <FormFooter
                leadingMessage="Don't have an account?"
                linkMessage="Sign up"
                linkPath={Paths.SignUp}
              />
            )}
            SuccessMessage={() => (
              <FormSuccessMessage
                title="Login Successful!"
                linkLeadingMessage="Proceed to"
                linkMessage="Dashboard"
                linkPath={Paths.Dashboard}
              />
            )}
          />
        </Box>
      </Sheet>
    </Box>
  )
}

// TODO: Rework this using Redux Saga
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

  useEffect(() => {
    return () => {
      abortController?.abort()
    }
  }, [])

  return (
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '365px',
    maxWidth: '365px',
  },
  formBodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '24px',
    width: '100%',
  },
} as const

export default Login
