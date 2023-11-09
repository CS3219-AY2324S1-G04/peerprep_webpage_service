import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button, Sheet, Stack, Typography, useTheme } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toast } from '../../components/Toaster/toast'
import QuestionForm from '../../features/questionBank/components/QuestionForm'
import { getFullQuestionMap } from '../../features/questionBank/selectors'
import { setSelectedQuestionId } from '../../features/questionBank/slice'
import {
  Question,
  QuestionBankSagaActions,
} from '../../features/questionBank/types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import useAsyncTask from '../../hooks/useAsyncTask'
import questionService from '../../services/questionService'
import { SubPaths } from '../../utils/constants/navigation'

// TODO: Add error state ui if question cant be found

const EditQuestion: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const fullQuestionMap = useAppSelector(getFullQuestionMap)
  const currentQuestion = fullQuestionMap[id ?? '']
  const [runEditQns, loadingEditQns] = useAsyncTask('editQuestion', (error) => {
    toast.error(
      error?.message ??
        'Oops! We encountered an error editing the question, sorry about that. Please try again later',
    )
  })

  useEffect(() => {
    if (!currentQuestion && id && id !== '') {
      dispatch(setSelectedQuestionId(id ?? ''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, id])

  const onEdit = (question: Question) => {
    runEditQns(async () => {
      await questionService.updateQuestion(question)
      toast.success('Question successfully updated!')
      navigate(SubPaths.ManageQuestions)
      dispatch({ type: QuestionBankSagaActions.GET_ALL_QUESTIONS })
    })
  }

  return (
    <Stack sx={styles.wrapper} gap={1}>
      <Button
        sx={styles.backButton}
        startDecorator={<ArrowBackIcon />}
        variant="plain"
        onClick={() => navigate(SubPaths.ManageQuestions)}
      >
        Back
      </Button>
      <Sheet
        sx={{
          ...styles.sheet,
          [theme.breakpoints.down('md')]: {
            width: '70%',
          },
          [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
        }}
      >
        <Typography sx={styles.formTitle} level="h3">
          Edit Question
        </Typography>
        <QuestionForm
          onSubmit={onEdit}
          submitLoading={loadingEditQns}
          question={currentQuestion}
        />
      </Sheet>
    </Stack>
  )
}

const styles = {
  wrapper: {
    margin: 'auto',
    width: '60%',
    maxWidth: '600px',
  } as SxProps,
  sheet: {
    borderRadius: '10px',
    padding: 3,
  } as SxProps,
  backButton: {
    maxWidth: '100px',
  } as SxProps,
  formTitle: {
    marginBottom: '1rem',
  } as SxProps,
  helpIcon: {
    fontSize: 'large',
    cursor: 'help',
  },
  descriptionLabel: {
    alignItems: 'center',
  } as SxProps,
  descriptionTooltip: {
    maxWidth: '240px',
  } as SxProps,
  languageAutocomplete: {
    width: '100%',
  } as SxProps,
  successImg: {
    margin: 'auto',
    maxWidth: '120px',
    animation: 'shakeRotate 5s ease 0s infinite normal forwards',
  },
  chipBox: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '60%',
    gap: '8px',
    justifyContent: 'flex-end',
  } as SxProps,
} as const

export default EditQuestion
