import { useEffect } from 'react'

import { FieldInfo } from '../types'
import Field from './Field'

const ConfirmPasswordField: React.FC<{
  fieldInfo: FieldInfo
  setFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  passwordFieldInfo: FieldInfo
}> = ({ fieldInfo, setFieldInfo, passwordFieldInfo }) => {
  function validate(confirmPassword: string) {
    if (confirmPassword !== passwordFieldInfo.value) {
      return 'Password does not match.'
    } else {
      return undefined
    }
  }

  useEffect(() => {
    setFieldInfo({
      value: fieldInfo.value,
      errorMessage: validate(fieldInfo.value),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordFieldInfo])

  return (
    <Field
      fieldName="Confirm Password"
      fieldInfo={fieldInfo}
      setFieldInfo={setFieldInfo}
      placeholder="Enter your password again"
      validate={validate}
      inputType="password"
    />
  )
}

export default ConfirmPasswordField
