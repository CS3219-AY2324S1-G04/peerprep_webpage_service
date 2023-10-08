import { FieldInfo } from '../types'
import validateUsername from '../utils/usernameValidator'
import Field from './Field'

const UsernameField: React.FC<{
  fieldInfo: FieldInfo
  setFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
}> = ({ fieldInfo, setFieldInfo }) => {
  return (
    <Field
      fieldName="Username"
      fieldInfo={fieldInfo}
      setFieldInfo={setFieldInfo}
      placeholder="Enter your username"
      validate={validateUsername}
    />
  )
}

export default UsernameField
