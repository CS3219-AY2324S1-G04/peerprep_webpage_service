import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
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
import moment from 'moment'
import { useEffect, useState } from 'react'

import Chip from '../../../components/Chip'
import { toast } from '../../../components/Toaster/toast'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import useAsyncTask from '../../../hooks/useAsyncTask'
import historyService from '../../../services/historyService'
import { getComplexityColor } from '../../../utils/uiHelpers'
import {
  getFullQuestionMap,
  getSelectedQuestionId,
} from '../../questionBank/selectors'
import { setSelectedQuestionId } from '../../questionBank/slice'
import { AttemptRow } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  attemptRow?: AttemptRow
}

const AttemptDetailsModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose, attemptRow } = props
  const { mode } = useColorScheme()
  const dispatch = useAppDispatch()
  const selectedQuestionId = useAppSelector(getSelectedQuestionId)
  const fullQuestionMap = useAppSelector(getFullQuestionMap)
  const [runGetAttemptCode] = useAsyncTask('getAttemptCode', (error) => {
    toast.error(
      error?.message ??
        'Oops! We encountered an error trying to fetch ur attempted code, sorry about that. Please try again later',
    )
  })

  const attemptQuestion = fullQuestionMap[selectedQuestionId]
  const [code, setCode] = useState<string>('')

  useEffect(() => {
    if (!attemptRow) return
    runGetAttemptCode(async () => {
      const data = await historyService.getUserAttemptCode(attemptRow.attemptId)
      setCode(data)
    })

    dispatch(setSelectedQuestionId(attemptRow.question._id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptRow])

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={styles.modelDialog}>
        <Box display="flex" alignItems="baseline">
          <ModalClose variant="plain" sx={styles.modelClose} />
          <Typography level="h2">Attempt Details</Typography>
        </Box>
        <Stack>
          <Typography level="body-sm">
            <b>Attempt ID: </b>
            {attemptRow?.attemptId}
          </Typography>
          <Typography level="body-sm">
            <b>Date & Time: </b>
            {moment(attemptRow?.date).format('LLLL')}
          </Typography>
          <Typography level="body-sm">
            <b>Language used: </b>
            {attemptRow?.language}
          </Typography>
          <br />
          <Typography fontWeight="bold">Submitted Code</Typography>
          <div data-color-mode={mode}>
            <MDEditor.Markdown source={code} />
          </div>
        </Stack>
        <AccordionGroup>
          <Accordion sx={{ padding: 0 }}>
            <AccordionSummary>View Question Details</AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {attemptQuestion && (
                  <>
                    <Typography level="h2">
                      {attemptQuestion.title}
                      <Typography
                        level="body-lg"
                        component="span"
                        color={getComplexityColor(attemptQuestion.complexity)}
                        sx={styles.complexityText}
                      >
                        {attemptQuestion.complexity}
                      </Typography>
                    </Typography>
                    <Box sx={styles.categoriesBox}>
                      {attemptQuestion.categories.map((category: string) => (
                        <Chip key={category}>{category}</Chip>
                      ))}
                    </Box>
                    <div data-color-mode={mode}>
                      <MDEditor.Markdown source={attemptQuestion.description} />
                    </div>
                    <Typography
                      fontWeight="bold"
                      fontStyle="italic"
                      level="body-sm"
                    >
                      Language Templates
                    </Typography>
                    <Box sx={styles.categoriesBox}>
                      {attemptQuestion.template.map((temp) => (
                        <JoyChip
                          variant="outlined"
                          color="primary"
                          key={temp.langSlug}
                        >
                          {temp.language}
                        </JoyChip>
                      ))}
                    </Box>
                  </>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
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

export default AttemptDetailsModal
