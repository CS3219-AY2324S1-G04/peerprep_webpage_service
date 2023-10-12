import { Box, Divider } from '@mui/joy'
import React, { PropsWithChildren } from 'react'

const Form: React.FC<
  PropsWithChildren<{ hasHeader?: boolean; hasFooter?: boolean }>
> = ({ children, hasHeader = true, hasFooter = true }) => {
  const childrenComponents = React.Children.toArray(children)

  const formHeader = hasHeader ? childrenComponents.shift() : undefined
  const formFooter = hasFooter ? childrenComponents.pop() : undefined

  return (
    <>
      {hasHeader ? (
        <>
          {formHeader}
          <Box height="32px" />
        </>
      ) : null}
      <Box sx={styles.formBodyContainer}>{childrenComponents}</Box>
      {hasFooter ? (
        <>
          <Box height="24px" />
          <Divider />
          <Box height="24px" />
          {formFooter}
        </>
      ) : null}
    </>
  )
}

const styles = {
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

export default Form
