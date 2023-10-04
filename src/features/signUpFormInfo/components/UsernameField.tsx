import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy'
import { ChangeEvent } from 'react'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectUsernameFieldInfo } from '../selectors'
import { setUsername } from '../slice'
import validateUsername from '../utils/usernameValidator'

const UsernameField: React.FC = () => {
  const usernameFieldInfo = useAppSelector(selectUsernameFieldInfo)
  const dispatch = useAppDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value
    const newErrorMessage: string | undefined = validateUsername(newValue)

    dispatch(setUsername({ value: newValue, errorMessage: newErrorMessage }))
  }

  return (
    <FormControl error={usernameFieldInfo.errorMessage !== undefined}>
      <FormLabel>Username</FormLabel>
      <Input
        variant="outlined"
        placeholder="Enter your username"
        value={usernameFieldInfo.value}
        onChange={handleChange}
      />
      {usernameFieldInfo.errorMessage === undefined ? (
        <></>
      ) : (
        <FormHelperText>{usernameFieldInfo.errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}

export default UsernameField
