import { Button } from '@mui/joy'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FieldInfo } from '../components/Form/FormField'
import UserForm from '../components/UserForm/UserForm'
import { getIsLoggedIn } from '../features/user/selector'
import { UserSagaActions } from '../features/user/types'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import useTaskSubscriber from '../hooks/useTaskSubscriber'
import Paths from '../utils/constants/navigation'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  const [isSubmitting] = useTaskSubscriber(UserSagaActions.CREATE_SESSION)

  const [usernameFieldInfo, setUsernameFieldInfo] = useState<FieldInfo>({
    value: '',
  })
  const [passwordFieldInfo, setPasswordFieldInfo] = useState<FieldInfo>({
    value: '',
  })

  const canSubmit: boolean =
    !isSubmitting &&
    usernameFieldInfo.value.length > 0 &&
    passwordFieldInfo.value.length > 0 &&
    usernameFieldInfo.errorMessage === undefined &&
    passwordFieldInfo.errorMessage === undefined

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Paths.Root)
    }
  }, [isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    dispatch({
      type: UserSagaActions.CREATE_SESSION,
      payload: {
        username: usernameFieldInfo.value,
        password: passwordFieldInfo.value,
      },
    })
  }

  return (
    <UserForm.Container>
      <UserForm onSubmit={canSubmit ? handleSubmit : undefined}>
        <UserForm.Header
          title="Log in to your account"
          message={['Welcome back! Please enter your details.']}
        />
        <UserForm.UsernameField
          fieldInfo={usernameFieldInfo}
          setFieldInfo={setUsernameFieldInfo}
          shouldValidate={false}
        />
        <UserForm.PasswordField
          fieldInfo={passwordFieldInfo}
          setFieldInfo={setPasswordFieldInfo}
          shouldValidate={false}
        />

        <Button disabled={!canSubmit} loading={isSubmitting} type="submit">
          Sign in
        </Button>

        <UserForm.Footer
          leadingMessage="Don't have an account?"
          linkMessage="Sign up"
          linkPath={Paths.SignUp}
        />
      </UserForm>
    </UserForm.Container>
  )
}

export default Login
