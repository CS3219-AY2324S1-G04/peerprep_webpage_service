import { FieldInfo } from '../types'
import validatePassword from '../utils/passwordValidator'
import Field from './Field'

const PasswordField: React.FC<{
  fieldInfo: FieldInfo
  setFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  validate?: boolean
}> = ({ fieldInfo, setFieldInfo, validate = true }) => {
  return (
    <Field
      fieldName="Password"
      fieldInfo={fieldInfo}
      setFieldInfo={setFieldInfo}
      placeholder="Enter your password"
      validate={validate ? validatePassword : undefined}
      inputType="password"
    />
  )
}

export default PasswordField
