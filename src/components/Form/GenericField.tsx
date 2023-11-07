import { FormControl, FormHelperText, FormLabel } from '@mui/joy'
import { PropsWithChildren } from 'react'

interface GenericFieldProps extends PropsWithChildren {
  label: string
  errorMessage?: string
}

const GenericField: React.FC<GenericFieldProps> = (
  props: GenericFieldProps,
) => {
  const { label, errorMessage, children } = props

  const isErrorPresent = errorMessage !== undefined && errorMessage !== ''

  return (
    <FormControl error={isErrorPresent}>
      <FormLabel>{label}</FormLabel>
      {children}
      {isErrorPresent && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export interface GenericFieldInfo<T> {
  value: T
  errorMessage?: string
}

export default GenericField
