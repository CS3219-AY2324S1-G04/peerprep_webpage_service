import { FieldInfo } from '../types'
import validateUsername from '../utils/usernameValidator'
import Field from './Field'

const UsernameField: React.FC<{
  fieldInfo: FieldInfo
  setFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  validate?: boolean
}> = ({ fieldInfo, setFieldInfo, validate = true }) => {
  return (
    <Field
      fieldName="Username"
      fieldInfo={fieldInfo}
      setFieldInfo={setFieldInfo}
      placeholder="Enter your username"
      validate={validate ? validateUsername : undefined}
    />
  )
}

export default UsernameField
