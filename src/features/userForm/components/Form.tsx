import { Box, Divider } from '@mui/joy'
import { useState } from 'react'

import { SubmissionStatus } from '../types'

const Form: React.FC<{
  FormHeader: React.FC
  FormBody: React.FC<{
    submissionStatus: SubmissionStatus
    setSubmissionStatus: React.Dispatch<React.SetStateAction<SubmissionStatus>>
  }>
  FormFooter: React.FC
  SuccessMessage: React.FC
  // eslint-disable-next-line @typescript-eslint/naming-convention
}> = ({ FormHeader, FormBody, FormFooter, SuccessMessage }) => {
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
