import { Box, Divider, Typography } from '@mui/joy'
import { Link as RouterLink } from 'react-router-dom'

import { useAppSelector } from '../../../hooks/useAppSelector'
import Paths from '../../../utils/constants/navigation'
import { selectSubmissionStatus } from '../selectors'
import { SubmissionStatus } from '../types'
import ConfirmPasswordField from './ConfirmPasswordField'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import SubmitButton from './SubmitButton'
import SuccessMessage from './SuccessMessage'
import UsernameField from './UsernameField'

const Form: React.FC = () => {
  const signUpFormSubmissionStatus = useAppSelector(selectSubmissionStatus)

  return signUpFormSubmissionStatus === SubmissionStatus.succeeded ? (
    <SuccessMessage />
  ) : (
    <>
      <FormHeader />
      <Box height="32px" />
      <FormBody />
      <Box height="24px" />
      <Divider />
      <Box height="24px" />
      <FormTail />
    </>
  )
}

const FormHeader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Box component="img" src="/logo.png" sx={{ width: '50px' }} />
      <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>
        Welcome to PeerPrep! 👋🏼
      </Typography>
      <Typography level="body-md" color="neutral" sx={{ textAlign: 'center' }}>
        Hello, I guess you are new around here.
        <br />
        Let's start by creating your account!
      </Typography>
    </Box>
  )
}

const FormBody: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '24px',
        width: '100%',
      }}
    >
      <EmailField />
      <UsernameField />
      <PasswordField />
      <ConfirmPasswordField />

      <SubmitButton />
    </Box>
  )
}

const FormTail: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '4px',
      }}
    >
      <Typography>Already have an account?</Typography>
      <Typography
        component={RouterLink}
        to={Paths.Login}
        color="primary"
        sx={{ fontWeight: 'bold', textDecoration: 'none' }}
      >
        Login
      </Typography>
    </Box>
  )
}

export default Form
