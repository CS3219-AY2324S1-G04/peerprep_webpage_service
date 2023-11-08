import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy'
import { ChangeEvent, FocusEvent } from 'react'

const FormField: React.FC<{
  label: string
  info: FieldInfo
  setInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  placeholder?: string
  validate?: (value: string) => string | undefined
  inputType?: string
  validateOnBlur?: boolean
  size?: 'sm' | 'md' | 'lg' // JoyUI input size type
}> = ({
  label,
  info,
  setInfo,
  placeholder = '',
  validate = () => undefined,
  inputType = 'text',
  validateOnBlur,
  size,
}) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue: string = event.target.value
    const newErrorMessage: string | undefined = validate(newValue)

    setInfo({ value: newValue, errorMessage: newErrorMessage })
  }

  function handleOnBlur(event: FocusEvent<HTMLInputElement>) {
    const newValue: string = event.target.value.trim()
    const newErrorMessage: string | undefined = validate(newValue)

    setInfo({ value: info.value, errorMessage: newErrorMessage })
  }

  return (
    <FormControl error={info.errorMessage !== undefined}>
      <FormLabel>{label}</FormLabel>
      <Input
        variant="outlined"
        placeholder={placeholder}
        type={inputType}
        value={info.value}
        onChange={handleChange}
        size={size}
        onBlur={validateOnBlur ? handleOnBlur : undefined}
      />
      {info.errorMessage !== undefined && (
        <FormHelperText>{info.errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}

export interface FieldInfo {
  value: string
  errorMessage?: string
}

export default FormField
