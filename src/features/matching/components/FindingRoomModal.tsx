import { Box, LinearProgress, Modal, ModalDialog, Typography } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useTaskSubscriber from '../../../hooks/useTaskSubscriber'
import Paths from '../../../utils/constants/navigation'
import { LoadingKeys } from '../../../utils/types'

const FindingRoomModal: React.FC = () => {
  const navigate = useNavigate()
  const [isCheckingStatus] = useTaskSubscriber(
    LoadingKeys.CHECKING_QUEUE_STATUS,
  )
  const [isRedirectToRoom] = useTaskSubscriber(LoadingKeys.REDIRECT_TO_ROOM)

  useEffect(() => {
    if (isRedirectToRoom) {
      navigate(Paths.MatchRoom)
    }
  }, [isRedirectToRoom])

  return (
    <Modal open={isCheckingStatus}>
      <ModalDialog sx={styles.modalDialog}>
        <Box margin="auto" textAlign="center">
          <Typography level="h3" mb={1}>
            Finding a room...
          </Typography>
          <Typography className="bounce" display="block" level="h1">
            🔎
          </Typography>
          <LinearProgress size="lg" />
          <Typography mt={2} level="body-md">
            Please wait while we look for a suitable room for you
          </Typography>
          <Typography level="body-sm">Do not close this tab</Typography>
        </Box>
      </ModalDialog>
    </Modal>
  )
}

const styles = {
  modalDialog: {
    maxWidth: 300,
    width: '100%',
    overflowY: 'auto',
  } as SxProps,
  modalClose: {
    m: 1,
  } as SxProps,
} as const

export default FindingRoomModal
