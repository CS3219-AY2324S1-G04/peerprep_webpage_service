import { Button, Modal, ModalDialog, ModalOverflow, Typography } from '@mui/joy'
import { useState } from 'react'

import { FieldInfo } from '../../components/Form/FormField'
import PasswordField from '../../components/UserForm/PasswordField'

const DeleteAccountModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [passwordFieldInfo, setPasswordFieldInfo] = useState<FieldInfo>({
    value: '',
  })

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
              disabled={
                passwordFieldInfo.errorMessage !== undefined ||
                passwordFieldInfo.value === ''
              }
              color="danger"
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
    gap: '24px',
    width: '400px',
  },
  sectionTitle: { textAlign: 'center', fontWeight: 'bold', fontSize: '24px' },
  divider: { margin: '0px' },
}

export default DeleteAccountModal
