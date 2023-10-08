import { Box } from '@mui/joy'
import { useState } from 'react'

import { FieldInfo, SubmissionStatus } from '../types'
import ConfirmPasswordField from './ConfirmPasswordField'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import SubmitButton from './SubmitButton'
import UsernameField from './UsernameField'

const FormBody: React.FC<{
  submissionStatus: SubmissionStatus
  setSubmissionStatus: React.Dispatch<React.SetStateAction<SubmissionStatus>>
}> = ({ submissionStatus, setSubmissionStatus }) => {
  const [emailFieldInfo, setEmailFieldInfo] = useState<FieldInfo>({ value: '' })
  const [usernameFieldInfo, setUsernameFieldInfo] = useState<FieldInfo>({
    value: '',
  })
  const [passwordFieldInfo, setPasswordFieldInfo] = useState<FieldInfo>({
    value: '',
  })
  const [confirmPasswordFieldInfo, setConfirmPasswordFieldInfo] =
    useState<FieldInfo>({ value: '' })

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
      <EmailField fieldInfo={emailFieldInfo} setFieldInfo={setEmailFieldInfo} />
      <UsernameField
        fieldInfo={usernameFieldInfo}
        setFieldInfo={setUsernameFieldInfo}
      />
      <PasswordField
        fieldInfo={passwordFieldInfo}
        setFieldInfo={setPasswordFieldInfo}
      />
      <ConfirmPasswordField
        confirmPasswordFieldInfo={confirmPasswordFieldInfo}
        setConfirmPasswordFieldInfo={setConfirmPasswordFieldInfo}
        passwordFieldInfo={passwordFieldInfo}
      />

      <SubmitButton
        emailFieldInfo={emailFieldInfo}
        setEmailFieldInfo={setEmailFieldInfo}
        usernameFieldInfo={usernameFieldInfo}
        setUsernameFieldInfo={setUsernameFieldInfo}
        passwordFieldInfo={passwordFieldInfo}
        setPasswordFieldInfo={setPasswordFieldInfo}
        confirmPasswordFieldInfo={confirmPasswordFieldInfo}
        submissionStatus={submissionStatus}
        setSubmissionStatus={setSubmissionStatus}
      />
    </Box>
  )
}

export default FormBody
