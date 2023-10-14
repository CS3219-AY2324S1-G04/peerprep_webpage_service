import { Settings } from '@mui/icons-material'
import {
  Button,
  Divider,
  Modal,
  ModalDialog,
  ModalOverflow,
  Typography,
} from '@mui/joy'
import React, { useState } from 'react'

import { FieldInfo } from '../../components/Form/FormField'
import ConfirmPasswordField from '../../components/UserForm/ConfirmPasswordField'
import EmailField from '../../components/UserForm/EmailField'
import PasswordField from '../../components/UserForm/PasswordField'
import UsernameField from '../../components/UserForm/UsernameField'
import { useAppSelector } from '../../hooks/useAppSelector'
import { UserProfile } from '../../services/userService'
import { selectProfile } from '../userInfo/selector'
import DeleteAccountModal from './DeleteAccountModal'

const AccountSettingsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} startDecorator={<Settings />}>
        Account Settings
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
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
    </>
  )
}

const EditProfileSection: React.FC = () => {
  const profile: UserProfile | undefined = useAppSelector(selectProfile)

  const [emailFieldInfo, setEmailFieldInfo] = useState<FieldInfo>({
    value: profile?.email ?? '',
  })
  const [usernameFieldInfo, setUsernameFieldInfo] = useState<FieldInfo>({
    value: profile?.username ?? '',
  })

  return (
    <>
      <Typography sx={styles.sectionTitle}>Profile</Typography>
      <EmailField fieldInfo={emailFieldInfo} setFieldInfo={setEmailFieldInfo} />
      <UsernameField
        fieldInfo={usernameFieldInfo}
        setFieldInfo={setUsernameFieldInfo}
      />
      <Button>Update Profile</Button>
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
      <Button>Change Password</Button>
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

const styles = {
  modalDialog: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '400px',
  },
  sectionTitle: { textAlign: 'center', fontWeight: 'bold', fontSize: '24px' },
  divider: { margin: '0px' },
}

export default AccountSettingsModal
