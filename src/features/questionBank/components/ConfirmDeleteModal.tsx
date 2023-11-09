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

import { toast } from '../../../components/Toaster/toast'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import useAsyncTask from '../../../hooks/useAsyncTask'
import questionService from '../../../services/questionService'
import { getSelectedQuestionId } from '../selectors'
import { QuestionBankSagaActions } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ConfirmDeleteModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props
  const dispatch = useAppDispatch()
  const selectedQuestionId = useAppSelector(getSelectedQuestionId)

  const [runDeleteQns, loadingDeleteQns] = useAsyncTask(
    'deleteQuestion',
    (error) => {
      toast.error(
        error?.message ??
          'Oops! We encountered an error deleting the question, sorry about that. Please try again later',
      )
    },
  )

  const onConfirmDelete = (id: string) => {
    runDeleteQns(async () => {
      await questionService.deleteQuestion(id)
      toast.success('Question successfully deleted!')
      dispatch({ type: QuestionBankSagaActions.GET_ALL_QUESTIONS })
      onClose()
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
          Are you sure you want to delete this question? We will still preserve
          previous attempts and history for this question.
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="solid"
            color="danger"
            loading={loadingDeleteQns}
            onClick={() => {
              onConfirmDelete(selectedQuestionId)
            }}
          >
            Delete Question
          </Button>
          <Button
            variant="plain"
            color="neutral"
            disabled={loadingDeleteQns}
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

export default ConfirmDeleteModal
