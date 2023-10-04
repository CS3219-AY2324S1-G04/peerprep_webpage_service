import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy'
import { ChangeEvent, useEffect } from 'react'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import {
  selectConfirmPasswordFieldInfo,
  selectPasswordFieldInfo,
} from '../selectors'
import { setConfirmPassword } from '../slice'

const ConfirmPasswordField: React.FC = () => {
  const passwordFieldInfo = useAppSelector(selectPasswordFieldInfo)
  const confirmPasswordFieldInfo = useAppSelector(
    selectConfirmPasswordFieldInfo,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (
      passwordFieldInfo.value !== confirmPasswordFieldInfo.value &&
      confirmPasswordFieldInfo.errorMessage === undefined
    ) {
      dispatch(
        setConfirmPassword({
          value: confirmPasswordFieldInfo.value,
          errorMessage: 'Password does not match.',
        }),
      )
    }

    if (
      passwordFieldInfo.value === confirmPasswordFieldInfo.value &&
      confirmPasswordFieldInfo.errorMessage !== undefined
    ) {
      dispatch(setConfirmPassword({ value: confirmPasswordFieldInfo.value }))
    }
  }, [dispatch, confirmPasswordFieldInfo, passwordFieldInfo])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setConfirmPassword({ value: event.target.value }))
  }

  return (
    <FormControl error={confirmPasswordFieldInfo.errorMessage !== undefined}>
      <FormLabel>Confirm Password</FormLabel>
      <Input
        variant="outlined"
        placeholder="Enter your password again"
        type="password"
        value={confirmPasswordFieldInfo.value}
        onChange={handleChange}
      />
      {confirmPasswordFieldInfo.errorMessage === undefined ? (
        <></>
      ) : (
        <FormHelperText>{confirmPasswordFieldInfo.errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}

export default ConfirmPasswordField
