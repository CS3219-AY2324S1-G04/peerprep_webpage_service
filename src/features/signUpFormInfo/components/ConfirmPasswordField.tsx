import { useEffect } from 'react'

import { FieldInfo } from '../types'
import Field from './Field'

const ConfirmPasswordField: React.FC<{
  confirmPasswordFieldInfo: FieldInfo
  setConfirmPasswordFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  passwordFieldInfo: FieldInfo
}> = ({
  confirmPasswordFieldInfo,
  setConfirmPasswordFieldInfo,
  passwordFieldInfo,
}) => {
  function validate(confirmPassword: string) {
    if (confirmPassword !== passwordFieldInfo.value) {
      return 'Password does not match.'
    } else {
      return undefined
    }
  }

  useEffect(() => {
    setConfirmPasswordFieldInfo({
      value: confirmPasswordFieldInfo.value,
      errorMessage: validate(confirmPasswordFieldInfo.value),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordFieldInfo])

  return (
    <Field
      fieldName="Confirm Password"
      fieldInfo={confirmPasswordFieldInfo}
      setFieldInfo={setConfirmPasswordFieldInfo}
      placeholder="Enter your password again"
      validate={validate}
      inputType="password"
    />
  )
}

export default ConfirmPasswordField
