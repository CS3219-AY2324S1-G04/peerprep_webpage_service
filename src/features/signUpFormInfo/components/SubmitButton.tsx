import { Button, Typography } from '@mui/joy'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectSignUpFormInfo } from '../selectors'
import { submitForm } from '../slice'
import { SubmissionStatus } from '../types'

const SubmitButton: React.FC = () => {
  const signUpFormInfo = useAppSelector(selectSignUpFormInfo)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(submitForm(signUpFormInfo)).then()
  }

  const shouldDisable: boolean =
    signUpFormInfo.email.value.length === 0 ||
    signUpFormInfo.username.value.length === 0 ||
    signUpFormInfo.password.value.length === 0 ||
    signUpFormInfo.confirmPassword.value.length === 0 ||
    signUpFormInfo.email.errorMessage !== undefined ||
    signUpFormInfo.username.errorMessage !== undefined ||
    signUpFormInfo.password.errorMessage !== undefined ||
    signUpFormInfo.confirmPassword.errorMessage !== undefined

  return (
    <>
      <Button
        disabled={shouldDisable}
        loading={signUpFormInfo.submissionStatus == SubmissionStatus.submitting}
        onClick={handleClick}
      >
        Create an account
      </Button>

      {signUpFormInfo.submissionStatus ==
      SubmissionStatus.failedErrorUnknown ? (
        <Typography textAlign="center" color="danger">
          Sorry, please try again later.
        </Typography>
      ) : (
        <></>
      )}
    </>
  )
}

export default SubmitButton
