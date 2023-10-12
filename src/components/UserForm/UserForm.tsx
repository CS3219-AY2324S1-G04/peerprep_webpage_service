import { Box, Divider } from '@mui/joy'
import React, { PropsWithChildren } from 'react'

const UserForm: React.FC<
  PropsWithChildren<{
    onSubmit?: React.FormEventHandler<HTMLFormElement>
  }>
> = ({ children, onSubmit }) => {
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

// TODO: Rework this using Redux Saga
export enum SubmissionStatus {
  yetToSubmit,
  submitting,
  succeeded,
  failedErrorUnknown,
  failedErrorKnown,
}

export default UserForm
