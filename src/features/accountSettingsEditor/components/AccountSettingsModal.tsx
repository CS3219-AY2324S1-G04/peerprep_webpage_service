import {
  Button,
  Divider,
  Modal,
  ModalDialog,
  ModalOverflow,
  Typography,
} from '@mui/joy'
import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'

import { FieldInfo } from '../../../components/Form/FormField'
import { toast } from '../../../components/Toaster/toast'
import ConfirmPasswordField from '../../../components/UserForm/ConfirmPasswordField'
import EmailAddressField from '../../../components/UserForm/EmailAddressField'
import PasswordField from '../../../components/UserForm/PasswordField'
import UsernameField from '../../../components/UserForm/UsernameField'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import useTaskSubscriber from '../../../hooks/useTaskSubscriber'
import userService, {
  UpdateUserProfileParamError,
  UserDeletionCredential,
  UserProfile,
} from '../../../services/userService'
import { getUserProfile } from '../../user/selector'
import { UserSagaActions } from '../../user/types'

const AccountSettingsModal: React.FC<{
  isOpen: boolean
  setIsOpen: (value: React.SetStateAction<boolean>) => void
}> = ({ isOpen, setIsOpen, ...rest }) => {
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)} {...rest}>
      <ModalOverflow>
        <ModalDialog sx={styles.modalDialog}>
          <EditProfileSection />
          <Divider sx={styles.divider} />
          <ChangePasswordSection />
          <Divider sx={styles.divider} />
          <MiscSection />
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  )
}

const EditProfileSection: React.FC = () => {
  const dispatch = useAppDispatch()

  const profile: UserProfile | undefined = useAppSelector(getUserProfile)

  const [emailAddressFieldInfo, setEmailAddressFieldInfo] = useState<FieldInfo>(
    {
      value: profile?.emailAddress ?? '',
    },
  )
  const [usernameFieldInfo, setUsernameFieldInfo] = useState<FieldInfo>({
    value: profile?.username ?? '',
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const canSubmit: boolean =
    !isSubmitting &&
    emailAddressFieldInfo.value.length > 0 &&
    usernameFieldInfo.value.length > 0 &&
    emailAddressFieldInfo.errorMessage === undefined &&
    usernameFieldInfo.errorMessage === undefined

  async function submit() {
    setIsSubmitting(true)

    try {
      await userService.updateUserProfile({
        emailAddress: emailAddressFieldInfo.value,
        username: usernameFieldInfo.value,
      })
      toast.success('Profile updated.')
    } catch (error) {
      if (isErrorCausedByInvalidParams(error)) {
        updateParamErrorMessages((error as AxiosError).response?.data ?? {})
        toast.error('Profile update failed: One or more fields are invalid.')
      } else if (isErrorCausedByAuthentication(error)) {
        toast.error(
          `Profile update failed: ${(error as AxiosError).response?.data}.`,
        )
      } else {
        toast.error('Profile update failed: Please try again later.')
      }
    }

    setIsSubmitting(false)

    dispatch({ type: UserSagaActions.FETCH_USER_PROFILE })
  }

  function isErrorCausedByInvalidParams(error: unknown): boolean {
    return error instanceof AxiosError && error.response?.status === 400
  }

  function isErrorCausedByAuthentication(error: unknown): boolean {
    return error instanceof AxiosError && error.response?.status === 401
  }

  function updateParamErrorMessages(paramError: UpdateUserProfileParamError) {
    setEmailAddressFieldInfo({
      value: emailAddressFieldInfo.value,
      errorMessage: paramError.emailAddress,
    })
    setUsernameFieldInfo({
      value: usernameFieldInfo.value,
      errorMessage: paramError.username,
    })
  }

  return (
    <>
      <Typography sx={styles.sectionTitle}>Profile</Typography>
      <EmailAddressField
        fieldInfo={emailAddressFieldInfo}
        setFieldInfo={setEmailAddressFieldInfo}
      />
      <UsernameField
        fieldInfo={usernameFieldInfo}
        setFieldInfo={setUsernameFieldInfo}
      />
      <Button disabled={!canSubmit} loading={isSubmitting} onClick={submit}>
        Update Profile
      </Button>
    </>
  )
}

const ChangePasswordSection: React.FC = () => {
  const [currentPasswordFieldInfo, setCurrentPasswordFieldInfo] =
    useState<FieldInfo>({
      value: '',
    })
  const [newPasswordFieldInfo, setNewPasswordFieldInfo] = useState<FieldInfo>({
    value: '',
  })
  const [confirmNewPasswordFieldInfo, setConfirmNewPasswordFieldInfo] =
    useState<FieldInfo>({ value: '' })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const canSubmit: boolean =
    !isSubmitting &&
    currentPasswordFieldInfo.value.length > 0 &&
    newPasswordFieldInfo.value.length > 0 &&
    confirmNewPasswordFieldInfo.value.length > 0 &&
    currentPasswordFieldInfo.errorMessage === undefined &&
    newPasswordFieldInfo.errorMessage === undefined &&
    confirmNewPasswordFieldInfo.errorMessage === undefined

  async function submit() {
    setIsSubmitting(true)

    try {
      await userService.updatePassword({
        password: currentPasswordFieldInfo.value,
        newPassword: newPasswordFieldInfo.value,
      })

      setCurrentPasswordFieldInfo({ value: '' })
      setNewPasswordFieldInfo({ value: '' })
      setConfirmNewPasswordFieldInfo({ value: '' })

      toast.success('Password changed.')
    } catch (error) {
      // No need to check for HTTP 400 error caused by invalid new password as
      // long as server and client are using the same password validation rules

      if (isErrorCausedByAuthentication(error)) {
        toast.error(
          `Password change failed: ${(error as AxiosError).response?.data}.`,
        )
      } else {
        toast.error('Password change failed: Please try again later.')
      }
    }

    setIsSubmitting(false)
  }

  function isErrorCausedByAuthentication(error: unknown): boolean {
    return error instanceof AxiosError && error.response?.status === 401
  }

  return (
    <>
      <Typography sx={styles.sectionTitle}>Change Password</Typography>
      <PasswordField
        fieldInfo={currentPasswordFieldInfo}
        setFieldInfo={setCurrentPasswordFieldInfo}
        shouldValidate={false}
        label="Current Password"
        placeholder="Enter your current password"
      />
      <PasswordField
        fieldInfo={newPasswordFieldInfo}
        setFieldInfo={setNewPasswordFieldInfo}
        label="New Password"
        placeholder="Enter your new password"
      />
      <ConfirmPasswordField
        fieldInfo={confirmNewPasswordFieldInfo}
        setFieldInfo={setConfirmNewPasswordFieldInfo}
        passwordFieldInfo={newPasswordFieldInfo}
        label="Confirm New Password"
        placeholder="Enter your new password again"
      />
      <Button disabled={!canSubmit} loading={isSubmitting} onClick={submit}>
        Change Password
      </Button>
    </>
  )
}

const MiscSection: React.FC = () => {
  return (
    <>
      <Typography textAlign="center" sx={styles.sectionTitle}>
        Misc
      </Typography>
      <DeleteAccountModal />
    </>
  )
}

const DeleteAccountModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isSubmitting] = useTaskSubscriber(UserSagaActions.DELETE_USER)

  const [isOpen, setIsOpen] = useState(false)

  const [passwordFieldInfo, setPasswordFieldInfo] = useState<FieldInfo>({
    value: '',
  })

  const canSubmit: boolean =
    !isSubmitting &&
    passwordFieldInfo.value.length > 0 &&
    passwordFieldInfo.errorMessage === undefined

  useEffect(() => {
    setPasswordFieldInfo({ value: '' })
  }, [isOpen])

  function submit() {
    dispatch<{ type: string; payload: UserDeletionCredential }>({
      type: UserSagaActions.DELETE_USER,
      payload: {
        password: passwordFieldInfo.value,
      },
    })
  }

  return (
    <>
      <Button color="danger" onClick={() => setIsOpen(true)}>
        Delete Account
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverflow>
          <ModalDialog sx={styles.modalDialog}>
            <Typography sx={styles.sectionTitle}>Delete Account</Typography>
            <Typography>
              Account deletion is permanent, it cannot be undone. If you would
              like to proceed, enter your password below.
            </Typography>
            <PasswordField
              fieldInfo={passwordFieldInfo}
              setFieldInfo={setPasswordFieldInfo}
              shouldValidate={false}
            />
            <Button
              disabled={!canSubmit}
              loading={isSubmitting}
              color="danger"
              onClick={submit}
            >
              Delete Account
            </Button>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </>
  )
}

const styles = {
  modalDialog: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '25rem',
  },
  sectionTitle: { textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' },
  divider: { margin: 0 },
}

export default AccountSettingsModal
