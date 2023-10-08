import { Box, Divider } from '@mui/joy'
import React, { useState } from 'react'

import { SubmissionStatus } from '../types'
import FormBody from './FormBody'
import FormFooter from './FormFooter'
import FormHeader from './FormHeader'
import SuccessMessage from './SuccessMessage'

const Form: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(
    SubmissionStatus.yetToSubmit,
  )

  return submissionStatus === SubmissionStatus.succeeded ? (
    <SuccessMessage />
  ) : (
    <>
      <FormHeader />
      <Box height="32px" />
      <FormBody
        submissionStatus={submissionStatus}
        setSubmissionStatus={setSubmissionStatus}
      />
      <Box height="24px" />
      <Divider />
      <Box height="24px" />
      <FormFooter />
    </>
  )
}

export default Form
