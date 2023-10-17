import { Box, Divider } from '@mui/joy'
import React from 'react'

import ConfirmPasswordField from './ConfirmPasswordField'
import EmailAddressField from './EmailAddressField'
import PasswordField from './PasswordField'
import UserFormContainer from './UserFormContainer'
import UserFormFooter from './UserFormFooter'
import UserFormHeader from './UserFormHeader'
import UserFormSuccessMessage from './UserFormSuccessMessage'
import UsernameField from './UsernameField'

interface UserFormProps extends React.PropsWithChildren {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

const UserForm = ({ children, onSubmit }: UserFormProps) => {
  const childrenComponents = React.Children.toArray(children)

  const formHeader = childrenComponents.shift()
  const formFooter = childrenComponents.pop()

  return (
    <Box component="form" sx={styles.formContainer} onSubmit={onSubmit}>
      {formHeader}
      <Box height="32px" />
      <Box sx={styles.formBodyContainer}>{childrenComponents}</Box>
      <Box height="24px" />
      <Divider />
      <Box height="24px" />
      {formFooter}
    </Box>
  )
}

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: { xs: 0, sm: '22.813rem' },
    maxWidth: '22.813rem',
  },
  formBodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '1.5rem',
    width: '100%',
  },
} as const

UserForm.Container = UserFormContainer
UserForm.Header = UserFormHeader
UserForm.Footer = UserFormFooter
UserForm.SuccessMessage = UserFormSuccessMessage

UserForm.UsernameField = UsernameField
UserForm.EmailAddressField = EmailAddressField
UserForm.PasswordField = PasswordField
UserForm.ConfirmPasswordField = ConfirmPasswordField

export default UserForm
