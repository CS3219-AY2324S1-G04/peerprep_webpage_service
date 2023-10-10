import { Box, Button, Sheet, Typography } from '@mui/joy'
import { AxiosError, CanceledError } from 'axios'
import { useEffect, useState } from 'react'

import Form, { SubmissionStatus } from '../components/Form/Form'
import { FieldInfo } from '../components/Form/FormField'
import FormFooter from '../components/Form/FormFooter'
import FormHeader from '../components/Form/FormHeader'
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

  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(
    SubmissionStatus.yetToSubmit,
  )

  // TODO: Rework this using Redux Saga
  async function submit() {
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
      if (e instanceof CanceledError) {
        return
      }

      if (e instanceof AxiosError && e.response?.status === 401) {
        setSubmissionStatus(SubmissionStatus.failedErrorKnown)
      } else {
        setSubmissionStatus(SubmissionStatus.failedErrorUnknown)
      }
    }
  }

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

  useEffect(() => {
    return () => {
      abortController?.abort()
    }
  }, [])

  return (
    <Box sx={styles.overallContainer}>
      <Sheet variant="soft" sx={styles.sheet}>
        <Box sx={styles.formContainer}>
          <Form>
            <FormHeader
              title="Log in to your account"
              message={['Welcome back! Please enter your details.']}
            />
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

            <Button
              disabled={
                usernameFieldInfo.value.length === 0 ||
                passwordFieldInfo.value.length === 0 ||
                usernameFieldInfo.errorMessage !== undefined ||
                passwordFieldInfo.errorMessage !== undefined
              }
              loading={submissionStatus == SubmissionStatus.submitting}
              onClick={submit}
            >
              Sign in
            </Button>

            {getErrorMessage(submissionStatus) === undefined ? null : (
              <Typography textAlign="center" color="danger">
                {getErrorMessage(submissionStatus)}
              </Typography>
            )}
            <FormFooter
              leadingMessage="Don't have an account?"
              linkMessage="Sign up"
              linkPath={Paths.SignUp}
            />
          </Form>
        </Box>
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '365px',
    maxWidth: '365px',
  },
} as const

export default Login
