import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy'
import { ChangeEvent } from 'react'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectPasswordFieldInfo } from '../selectors'
import { setPassword } from '../slice'
import validatePassword from '../utils/passwordValidator'

const PasswordField: React.FC = () => {
  const passwordFieldInfo = useAppSelector(selectPasswordFieldInfo)
  const dispatch = useAppDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value
    const newErrorMessage: string | undefined = validatePassword(newValue)

    dispatch(setPassword({ value: newValue, errorMessage: newErrorMessage }))
  }

  return (
    <FormControl error={passwordFieldInfo.errorMessage !== undefined}>
      <FormLabel>Password</FormLabel>
      <Input
        variant="outlined"
        placeholder="Enter your password"
        type="password"
        value={passwordFieldInfo.value}
        onChange={handleChange}
      />
      {passwordFieldInfo.errorMessage === undefined ? (
        <></>
      ) : (
        <FormHelperText>{passwordFieldInfo.errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}

export default PasswordField
