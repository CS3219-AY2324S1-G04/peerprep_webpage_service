import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy'
import { ChangeEvent } from 'react'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectEmailFieldInfo } from '../selectors'
import { setEmail } from '../slice'
import validateEmail from '../utils/emailValidator'

const EmailField: React.FC = () => {
  const emailFieldInfo = useAppSelector(selectEmailFieldInfo)
  const dispatch = useAppDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value
    const newErrorMessage: string | undefined = validateEmail(newValue)

    dispatch(setEmail({ value: newValue, errorMessage: newErrorMessage }))
  }

  return (
    <FormControl error={emailFieldInfo.errorMessage !== undefined}>
      <FormLabel>Email</FormLabel>
      <Input
        variant="outlined"
        placeholder="Enter your email"
        value={emailFieldInfo.value}
        onChange={handleChange}
      />
      {emailFieldInfo.errorMessage === undefined ? (
        <></>
      ) : (
        <FormHelperText>{emailFieldInfo.errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}

export default EmailField
