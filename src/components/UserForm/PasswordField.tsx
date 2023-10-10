import FormField, { FieldInfo } from '../Form/FormField'

const minPasswordLength: number = 8
const maxPasswordLength: number = 255

const lowerCaseAlphabets: string = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseAlphabets: string = lowerCaseAlphabets.toUpperCase()
const numerics: string = '0123456789'
const specialCharacters: string = '!@#$%^&*'
const validCharacters: string =
  lowerCaseAlphabets + upperCaseAlphabets + numerics + specialCharacters

const characterValidityRegex: RegExp = new RegExp(`^[${validCharacters}]+$`)

const lowerCaseAlphabetExistRegex: RegExp = RegExp(`[${lowerCaseAlphabets}]`)
const upperCaseAlphabetExistRegex: RegExp = RegExp(`[${upperCaseAlphabets}]`)
const numericExistRegex: RegExp = RegExp(`[${numerics}]`)
const specialCharacterExistRegex: RegExp = RegExp(`[${specialCharacters}]`)

const PasswordField: React.FC<{
  fieldInfo: FieldInfo
  setFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  shouldValidate?: boolean
}> = ({ fieldInfo, setFieldInfo, shouldValidate = true }) => {
  return (
    <FormField
      label="Password"
      info={fieldInfo}
      setInfo={setFieldInfo}
      placeholder="Enter your password"
      validate={shouldValidate ? validate : undefined}
      inputType="password"
    />
  )
}

function validate(password: string): string | undefined {
  if (password.length < minPasswordLength) {
    return `Password must be at least ${minPasswordLength} characters long.`
  }

  if (password.length > maxPasswordLength) {
    return `Password cannot exceed ${maxPasswordLength} characters.`
  }

  if (!characterValidityRegex.test(password)) {
    return `Password can only contain ${specialCharacters} or alphanumeric characters.`
  }

  if (
    !lowerCaseAlphabetExistRegex.test(password) ||
    !upperCaseAlphabetExistRegex.test(password) ||
    !numericExistRegex.test(password) ||
    !specialCharacterExistRegex.test(password)
  ) {
    return `Password must contain at least one uppercase alphabet, one lowercase alphabet, one numeric character, and one of the following: ${specialCharacters}`
  }
}

export default PasswordField
