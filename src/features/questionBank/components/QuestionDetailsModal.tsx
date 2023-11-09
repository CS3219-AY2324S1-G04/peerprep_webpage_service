import {
  Box,
  Chip as JoyChip,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
  useColorScheme,
} from '@mui/joy'
import MDEditor from '@uiw/react-md-editor'

import Chip from '../../../components/Chip'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getComplexityColor } from '../../../utils/uiHelpers'
import { getFullQuestionMap, getSelectedQuestionId } from '../selectors'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const QuestionDetailsModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props
  const { mode } = useColorScheme()
  const selectedQuestionId = useAppSelector(getSelectedQuestionId)
  const fullQuestionMap = useAppSelector(getFullQuestionMap)
  // TODO: Add Skeleton on loading
  // const [selectedQnsLoading] =
  // useTaskSubscriber(LoadingKeys.FETCHING_SELECTED_QUESTION)

  const currentQuestion = fullQuestionMap[selectedQuestionId]

  // TODO: Handle null question better via UI
  if (!currentQuestion) return null

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={styles.modelDialog}>
        <Box display="flex" alignItems="baseline">
          <ModalClose variant="plain" sx={styles.modelClose} />
          <Typography level="h2">
            {currentQuestion.title}
            <Typography
              level="body-lg"
              component="span"
              color={getComplexityColor(currentQuestion.complexity)}
              sx={styles.complexityText}
            >
              {currentQuestion.complexity}
            </Typography>
          </Typography>
        </Box>
        <Stack spacing={2}>
          <Box sx={styles.categoriesBox}>
            {currentQuestion.categories.map((category: string) => (
              <Chip key={category}>{category}</Chip>
            ))}
          </Box>
          <div data-color-mode={mode}>
            <MDEditor.Markdown source={currentQuestion.description} />
          </div>
          <Typography fontWeight="bold" fontStyle="italic" level="body-sm">
            Language Templates
          </Typography>
          <Box sx={styles.categoriesBox}>
            {currentQuestion.template.map((temp) => (
              <JoyChip variant="outlined" color="primary" key={temp.langSlug}>
                {temp.language}
              </JoyChip>
            ))}
          </Box>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

const styles = {
  modelDialog: {
    maxWidth: 700,
    width: '100%',
    overflowY: 'auto',
  },
  modelClose: {
    m: 1,
  },
  complexityText: {
    ml: 1,
    fontWeight: 'bold',
  },
  categoriesBox: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: 1,
    rowGap: 1,
    flexDirection: 'row',
  },
} as const

export default QuestionDetailsModal
