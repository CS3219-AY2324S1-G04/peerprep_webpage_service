import { Box, Button, Sheet, Typography } from '@mui/joy'
import { AxiosError, CanceledError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Form, { SubmissionStatus } from '../components/Form/Form'
import { FieldInfo } from '../components/Form/FormField'
import FormFooter from '../components/Form/FormFooter'
import FormHeader from '../components/Form/FormHeader'
import PasswordField from '../components/UserForm/PasswordField'
import UsernameField from '../components/UserForm/UsernameField'
import { updateUserInfo } from '../features/userInfo/slice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import userService, { UserProfile } from '../services/userService'
import Paths from '../utils/constants/navigation'

let abortController: AbortController

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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

    let userProfile: UserProfile
    try {
      await userService.createSession(
        usernameFieldInfo.value,
        passwordFieldInfo.value,
        abortController,
      )

      userProfile = await userService.getUserProfile(abortController)
    } catch (e) {
      if (e instanceof CanceledError) {
        setSubmissionStatus(SubmissionStatus.yetToSubmit)
      } else if (e instanceof AxiosError && e.response?.status === 401) {
        setSubmissionStatus(SubmissionStatus.failedErrorKnown)
      } else {
        setSubmissionStatus(SubmissionStatus.failedErrorUnknown)
      }

      return
    }

    setSubmissionStatus(SubmissionStatus.succeeded)
    dispatch(updateUserInfo(userProfile))
    navigate(Paths.Dashboard)
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
