import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from '@mui/joy'
import { useNavigate } from 'react-router-dom'

import { toast } from '../../../components/Toaster/toast'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import useAsyncTask from '../../../hooks/useAsyncTask'
import roomService from '../../../services/roomService'
import Paths from '../../../utils/constants/navigation'
import { HistorySagaActions } from '../../history/types'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ConfirmLeaveModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [runLeaveRoom, loadingLeaveRoom] = useAsyncTask(
    'leaveRoom',
    (error) => {
      toast.error(
        error?.message ??
          'Oops! We encountered an error, sorry about that. Please try again later',
      )
    },
  )

  const onConfirmLeave = () => {
    runLeaveRoom(async () => {
      await roomService.leaveRoom()
      toast.success('Successfully submitted your attempt! Great work! 🎉')
      dispatch({ type: HistorySagaActions.GET_ALL_USER_ATTEMPTS })
      navigate(Paths.Problems)
    })
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={styles.modelDialog}>
        <DialogTitle>
          <WarningRoundedIcon />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>
          Are you sure you want to leave this room and submit your code?
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="solid"
            color="danger"
            loading={loadingLeaveRoom}
            onClick={() => {
              onConfirmLeave()
            }}
          >
            Confirm Leave & Submit
          </Button>
          <Button
            variant="plain"
            color="neutral"
            disabled={loadingLeaveRoom}
            onClick={() => {
              onClose()
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}

const styles = {
  modelDialog: {
    maxWidth: 400,
    width: '100%',
    overflowY: 'auto',
  },
} as const

export default ConfirmLeaveModal
