import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy'
import { ChangeEvent } from 'react'

const FormField: React.FC<{
  label: string
  info: FieldInfo
  setInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  placeholder: string
  validate?: (value: string) => string | undefined
  inputType?: string
}> = ({
  label,
  info,
  setInfo,
  placeholder,
  validate = () => undefined,
  inputType = 'text',
}) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue: string = event.target.value
    const newErrorMessage: string | undefined = validate(newValue)

    setInfo({ value: newValue, errorMessage: newErrorMessage })
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
      />
      {info.errorMessage === undefined ? (
        <></>
      ) : (
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
