import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy'
import { ChangeEvent } from 'react'

import { FieldInfo } from '../types'

const Field: React.FC<{
  fieldName: string
  fieldInfo: FieldInfo
  setFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  placeholder: string
  validate: (value: string) => string | undefined
  inputType?: string
}> = ({
  fieldName,
  fieldInfo,
  setFieldInfo,
  placeholder,
  validate,
  inputType = 'text',
}) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue: string = event.target.value
    const newErrorMessage: string | undefined = validate(newValue)

    setFieldInfo({ value: newValue, errorMessage: newErrorMessage })
  }

  return (
    <FormControl error={fieldInfo.errorMessage !== undefined}>
      <FormLabel>{fieldName}</FormLabel>
      <Input
        variant="outlined"
        placeholder={placeholder}
        type={inputType}
        value={fieldInfo.value}
        onChange={handleChange}
      />
      {fieldInfo.errorMessage === undefined ? (
        <></>
      ) : (
        <FormHelperText>{fieldInfo.errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}

export default Field
