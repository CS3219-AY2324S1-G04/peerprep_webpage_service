import { Box } from '@mui/joy'
import { useState } from 'react'

import PasswordField from '../../userForm/components/PasswordField'
import UsernameField from '../../userForm/components/UsernameField'
import { FieldInfo, SubmissionStatus } from '../../userForm/types'
import SubmitButton from './SubmitButton'

const FormBody: React.FC<{
  submissionStatus: SubmissionStatus
  setSubmissionStatus: React.Dispatch<React.SetStateAction<SubmissionStatus>>
}> = ({ submissionStatus, setSubmissionStatus }) => {
  const [usernameFieldInfo, setUsernameFieldInfo] = useState<FieldInfo>({
    value: '',
  })
  const [passwordFieldInfo, setPasswordFieldInfo] = useState<FieldInfo>({
    value: '',
  })

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
      <UsernameField
        fieldInfo={usernameFieldInfo}
        setFieldInfo={setUsernameFieldInfo}
        validate={false}
      />
      <PasswordField
        fieldInfo={passwordFieldInfo}
        setFieldInfo={setPasswordFieldInfo}
        validate={false}
      />

      <SubmitButton
        usernameFieldInfo={usernameFieldInfo}
        passwordFieldInfo={passwordFieldInfo}
        submissionStatus={submissionStatus}
        setSubmissionStatus={setSubmissionStatus}
      />
    </Box>
  )
}

export default FormBody
