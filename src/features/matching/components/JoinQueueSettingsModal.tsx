import Done from '@mui/icons-material/Done'
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  List,
  ListItem,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Typography,
} from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useState } from 'react'

import { toast } from '../../../components/Toaster/toast'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import matchingService from '../../../services/matchingService'
import { LoadingKeys } from '../../../utils/types'
import { parseStringToComplexityEnum } from '../../../utils/uiHelpers'
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
  const [language, setLanguage] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])
  const allCategories = useAppSelector(getCategories)
  const allLanguages = useAppSelector(getLanguages)

  async function submit() {
    try {
      await matchingService.joinQueue({
        difficulty: complexity,
        categories: categories,
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
              setComplexity(parseStringToComplexityEnum(newValue ?? ''))
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
        <FormControl>
          <FormLabel>Choose Language</FormLabel>
          <Select
            defaultValue={language}
            onChange={(e, newValue) => setLanguage(newValue ?? '')}
          >
            {allLanguages.map((item, index) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </FormControl>
        <FormLabel>Choose Categories</FormLabel>
        <List
          orientation="horizontal"
          wrap
          sx={{
            '--List-gap': '8px',
            '--ListItem-radius': '20px',
            '--ListItem-minHeight': '32px',
            '--ListItem-gap': '4px',
          }}
        >
          {allCategories.map((item, index) => (
            <ListItem key={item}>
              {categories.includes(item) && (
                <Done
                  color="primary"
                  sx={{ ml: -0.5, zIndex: 2, pointerEvents: 'none' }}
                />
              )}
              <Checkbox
                size="sm"
                disableIcon
                overlay
                label={item}
                checked={categories.includes(item)}
                variant={categories.includes(item) ? 'soft' : 'outlined'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.checked) {
                    setCategories((val) => [...val, item])
                  } else {
                    setCategories((val) => val.filter((text) => text !== item))
                  }
                }}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: checked
                      ? {
                          border: '1px solid',
                          borderColor: 'primary.500',
                        }
                      : {},
                  }),
                }}
              />
            </ListItem>
          ))}
        </List>

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
