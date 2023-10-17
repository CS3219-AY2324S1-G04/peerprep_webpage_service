import FormField, { FieldInfo } from '../Form/FormField'

const minUsernameLength: number = 3
const maxUsernameLength: number = 255
const usernameRegex: RegExp = new RegExp('^[a-zA-Z0-9_]+$')

const UsernameField: React.FC<{
  fieldInfo: FieldInfo
  setFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  shouldValidate?: boolean
}> = ({ fieldInfo, setFieldInfo, shouldValidate = true }) => {
  return (
    <FormField
      label="Username"
      info={fieldInfo}
      setInfo={setFieldInfo}
      placeholder="Enter your username"
      validate={shouldValidate ? validate : undefined}
    />
  )
}

function validate(username: string): string | undefined {
  if (username.length < minUsernameLength) {
    return `Username must be at least ${minUsernameLength} characters long.`
  }

  if (username.length > maxUsernameLength) {
    return `Username cannot exceed ${maxUsernameLength} characters.`
  }

  if (!usernameRegex.test(username)) {
    return "Username can only contain '_' or alphanumeric characters."
  }
}

export default UsernameField
