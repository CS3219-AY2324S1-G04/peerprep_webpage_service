import {
  Autocomplete,
  Button,
  Chip,
  ChipDelete,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Typography
} from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useState } from 'react'

import GenericField from '../../../components/Form/GenericField'
import { toast } from '../../../components/Toaster/toast'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import matchingService from '../../../services/matchingService'
import { Language } from '../../../services/questionService'
import { LoadingKeys } from '../../../utils/types'
import { addLoadingTask } from '../../common/slice'
import { getCategories, getLanguages } from '../../questionBank/selectors'
import { QuestionComplexity } from '../../questionBank/types'
import { MatchingSagaActions } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
}

// TODO: Retrieve/Store values in local storage
const JoinQueueSettingsModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props
  const dispatch = useAppDispatch()
  const [complexity, setComplexity] = useState<QuestionComplexity>(
    QuestionComplexity.Easy,
  )
  const [categories, setCategories] = useState<string[]>([])
  const [language, setLanguage] = useState<Language | null>(null)
  const allCategories = useAppSelector(getCategories)
  const allLanguages = useAppSelector(getLanguages)

  async function submit() {
    try {
      await matchingService.joinQueue({
        difficulty: complexity,
        categories: categories,
        language: language?.langSlug ?? 'java',
      })
      dispatch({ type: MatchingSagaActions.START_CHECK_QUEUE_STATUS })
      dispatch(addLoadingTask(LoadingKeys.CHECKING_QUEUE_STATUS))
      onClose()
    } catch (error) {
      toast.error('Join Queue failed: Please try again later')
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={styles.modalDialog}>
        <ModalClose variant="plain" sx={styles.modalClose} />
        <Typography level="h3">PeerPrep Settings</Typography>
        <Typography level="body-sm">
          We'll use these settings to help you find a suitable problem to tackle
          together with your peer.
        </Typography>
        <FormControl>
          <FormLabel>Choose Complexity</FormLabel>
          <Select
            defaultValue={complexity}
            onChange={(e, newValue) =>
              setComplexity(newValue ?? QuestionComplexity.Easy)
            }
          >
            <Option value={QuestionComplexity.Easy}>
              {QuestionComplexity.Easy}
            </Option>
            <Option value={QuestionComplexity.Medium}>
              {QuestionComplexity.Medium}
            </Option>
            <Option value={QuestionComplexity.Hard}>
              {QuestionComplexity.Hard}
            </Option>
          </Select>
        </FormControl>
        <GenericField label="Choose Categories">
          <Autocomplete
            multiple
            placeholder="Question Categories"
            options={allCategories}
            value={categories}
            onChange={(_, updatedCategories) => {
              setCategories(updatedCategories)
            }}
            renderTags={(tags, getTagProps) =>
              tags.map((item, index) => {
                const { onClick, ...rest } = getTagProps({ index })
                return (
                  <Chip
                    color="primary"
                    endDecorator={<ChipDelete onDelete={onClick} />}
                    {...rest}
                  >
                    {item}
                  </Chip>
                )
              })
            }
          />
        </GenericField>
        <GenericField label="Choose Languages">
          <Autocomplete
            placeholder="Language Templates"
            options={allLanguages}
            value={language}
            onChange={(_, updatedLanguage) => {
              setLanguage(updatedLanguage)
            }}
            getOptionLabel={(option) => option.language}
            renderTags={(tags, getTagProps) =>
              tags.map((item, index) => {
                const { onClick, ...rest } = getTagProps({ index })
                return (
                  <Chip
                    color="primary"
                    variant="outlined"
                    endDecorator={<ChipDelete onDelete={onClick} />}
                    {...rest}
                  >
                    {item.language}
                  </Chip>
                )
              })
            }
          />
        </GenericField>

        <Button disabled={categories.length === 0} onClick={() => submit()}>
          Join Queue
        </Button>
      </ModalDialog>
    </Modal>
  )
}

const styles = {
  modalDialog: {
    maxWidth: 500,
    width: '100%',
    overflowY: 'auto',
  } as SxProps,
  modalClose: {
    m: 1,
  } as SxProps,
} as const

export default JoinQueueSettingsModal
