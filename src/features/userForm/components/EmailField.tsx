import { FieldInfo } from '../types'
import validateEmail from '../utils/emailValidator'
import Field from './Field'

const EmailField: React.FC<{
  fieldInfo: FieldInfo
  setFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
}> = ({ fieldInfo, setFieldInfo }) => {
  return (
    <Field
      fieldName="Email"
      fieldInfo={fieldInfo}
      setFieldInfo={setFieldInfo}
      placeholder="Enter your email"
      validate={validateEmail}
    />
  )
}

export default EmailField
