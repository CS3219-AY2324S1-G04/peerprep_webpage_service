import { useEffect } from 'react'

import FormField, { FieldInfo } from '../Form/FormField'

const ConfirmPasswordField: React.FC<{
  fieldInfo: FieldInfo
  setFieldInfo: React.Dispatch<React.SetStateAction<FieldInfo>>
  passwordFieldInfo: FieldInfo
}> = ({ fieldInfo, setFieldInfo, passwordFieldInfo }) => {
  function validate(confirmPassword: string) {
    return confirmPassword !== passwordFieldInfo.value
      ? 'Password does not match.'
      : undefined
  }

  useEffect(() => {
    setFieldInfo({
      value: fieldInfo.value,
      errorMessage: validate(fieldInfo.value),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordFieldInfo])

  return (
    <FormField
      label="Confirm Password"
      info={fieldInfo}
      setInfo={setFieldInfo}
      placeholder="Enter your password again"
      validate={validate}
      inputType="password"
    />
  )
}

export default ConfirmPasswordField
