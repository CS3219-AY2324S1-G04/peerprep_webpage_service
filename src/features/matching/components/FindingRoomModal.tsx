import { Box, Button, Modal, ModalDialog, Typography } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from '../../../components/Toaster/toast'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import useAsyncTask from '../../../hooks/useAsyncTask'
import useTaskSubscriber from '../../../hooks/useTaskSubscriber'
import matchingService from '../../../services/matchingService'
import Paths from '../../../utils/constants/navigation'
import { LoadingKeys } from '../../../utils/types'
import { removeLoadingTask } from '../../common/slice'
import { MatchingSagaActions } from '../types'
import CountdownSlider from './CountdownSlider'

const FindingRoomModal: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isCheckingStatus] = useTaskSubscriber(
    LoadingKeys.CHECKING_QUEUE_STATUS,
  )
  const [isRedirectToRoom] = useTaskSubscriber(LoadingKeys.REDIRECT_TO_ROOM)
  const [isQuickPrep] = useTaskSubscriber(LoadingKeys.QUICK_PREP)

  const [runLeaveQueue, loadingLeaveQueue] = useAsyncTask(
    'leaveQueue',
    (error) => {
      toast.error(
        error?.message ??
          'Oops! We encountered an error, sorry about that. Please try again later',
      )
    },
  )

  const onConfirmLeave = () => {
    runLeaveQueue(async () => {
      await matchingService.leaveQueue()
      dispatch(removeLoadingTask(LoadingKeys.CHECKING_QUEUE_STATUS))
      dispatch({ type: MatchingSagaActions.STOP_CHECK_QUEUE_STATUS })
      toast.success('Successfully left the queue.')
    })
  }

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
          <CountdownSlider />
          {isQuickPrep && (
            <Typography mt={2} level="body-md">
              QuickPrep🔥
            </Typography>
          )}
          <Typography mt={2} level="body-md">
            Please wait while we look for a suitable room for you
          </Typography>
          <Typography level="body-sm">
            Do not close or refresh this tab
          </Typography>
          <Button
            sx={{ marginTop: 2 }}
            color="danger"
            onClick={() => onConfirmLeave()}
            loading={loadingLeaveQueue}
            size="sm"
          >
            Leave Queue 🏃🏻‍♂️
          </Button>
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
