import { Box, LinearProgress, Modal, ModalDialog, Typography } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import useTaskSubscriber from '../../../hooks/useTaskSubscriber'
import Paths from '../../../utils/constants/navigation'
import { LoadingKeys } from '../../../utils/types'
import { removeLoadingTask } from '../../common/slice'

const FindingRoomModal: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isCheckingStatus] = useTaskSubscriber(
    LoadingKeys.CHECKING_QUEUE_STATUS,
  )
  const [isRedirectToRoom] = useTaskSubscriber(LoadingKeys.REDIRECT_TO_ROOM)
  const [isQuickPrep] = useTaskSubscriber(LoadingKeys.QUICK_PREP)

  useEffect(() => {
    if (isRedirectToRoom) {
      dispatch(removeLoadingTask(LoadingKeys.REDIRECT_TO_ROOM))
      navigate(Paths.MatchRoom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectToRoom])

  useEffect(() => {
    if (!isCheckingStatus) {
      dispatch(removeLoadingTask(LoadingKeys.QUICK_PREP))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckingStatus])

  return (
    <Modal open={isCheckingStatus}>
      <ModalDialog sx={styles.modalDialog}>
        <Box margin="auto" textAlign="center">
          <Typography level="h3" mb={1}>
            Finding a room...
          </Typography>
          <Typography className="bounce" display="block" level="h1">
            {!isQuickPrep ? '🔎' : '🚀'}
          </Typography>
          <LinearProgress size="lg" />
          {isQuickPrep && (
            <Typography mt={2} level="body-md">
              QuickPrep🔥
            </Typography>
          )}
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
