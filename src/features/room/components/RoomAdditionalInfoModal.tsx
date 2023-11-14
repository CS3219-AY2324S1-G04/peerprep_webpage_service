import {
  Box,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const RoomAdditionalInfoModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={styles.modelDialog}>
        <Box display="flex" alignItems="baseline">
          <ModalClose variant="plain" sx={styles.modelClose} />
          <Typography level="h2">Room Additional Information</Typography>
        </Box>
        <Stack spacing={2}>
          <Typography level="body-sm">
            1. Rooms will be open for collaboration as long as you or your peer
            are on the room pages.
            <br />
            <br />
            2. If both you or your peer navigates out of the room page (without
            submission), the room will still be open for a certain period of
            time.
            <br />
            <br />
            3. Attempts will only be counted if you confirm with the "Leave &
            Submit" button.
            <br />
            <br />
            4. You will not be allowed to PeerPrep for another problem as long
            as you are in an active room.
            <br />
            <br />
            5. On a mobile screen, chat button can be seen on the bottom right
            of the screen.
            <br />
            <br />
          </Typography>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

const styles = {
  modelClose: {
    m: 1,
  },
  modelDialog: {
    maxWidth: 500,
    width: '100%',
    overflowY: 'auto',
  },
} as const

export default RoomAdditionalInfoModal
