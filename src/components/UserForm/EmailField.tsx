import FormField, { FieldInfo } from '../Form/FormField'

const maxEmailLength: number = 255

const domainLabelRegexStr: string = '[a-zA-Z0-9]([a-zA-Z0-9\\-]*[a-zA-Z0-9]+)*'
const domainRegexStr: string = `${domainLabelRegexStr}(\\.${domainLabelRegexStr})+`

const emailLocalPartChars: string = "[a-zA-Z0-9!#$%&'*+\\-/=?^_`{|}~]"
const emailLocalPartRegexStr: string = `^${emailLocalPartChars}+(\\.${emailLocalPartChars}+)*`

const emailRegex: RegExp = new RegExp(
  `${emailLocalPartRegexStr}@${domainRegexStr}$`,
)

const EmailField: React.FC<{
  fieldInfo: FieldInfo
  setFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  shouldValidate?: boolean
}> = ({ fieldInfo, setFieldInfo, shouldValidate = true }) => {
  return (
    <FormField
      label="Email"
      info={fieldInfo}
      setInfo={setFieldInfo}
      placeholder="Enter your email"
      validate={shouldValidate ? validate : undefined}
    />
  )
}

function validate(email: string): string | undefined {
  if (email.length === 0) {
    return 'Email cannot be empty.'
  }

  if (email.length > maxEmailLength) {
    return `Email cannot exceed ${maxEmailLength} characters.`
  }

  if (!emailRegex.test(email)) {
    return 'Email is invalid.'
  }
}

export default EmailField
