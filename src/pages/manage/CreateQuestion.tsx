import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Chip, Sheet, Stack, Typography, useTheme } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import success from '../../assets/success.png'
import { toast } from '../../components/Toaster/toast'
import QuestionForm from '../../features/questionBank/components/QuestionForm'
import {
  DraftQuestion,
  Question,
  QuestionBankSagaActions,
} from '../../features/questionBank/types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import useAsyncTask from '../../hooks/useAsyncTask'
import questionService from '../../services/questionService'
import { SubPaths } from '../../utils/constants/navigation'
import { getComplexityColor } from '../../utils/uiHelpers'

const CreateQuestion: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [runCreateQns, loadingCreateQns] = useAsyncTask(
    'createQuestion',
    (error) => {
      toast.error(
        error?.message ??
          'Oops! We encountered an error creating the question, sorry about that. Please try again later',
      )
    },
  )
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false)
  const [submittedQns, setSubmittedQns] = useState<DraftQuestion | undefined>()

  const onCreate = (question: Question) => {
    runCreateQns(async () => {
      await questionService.createQuestion(question)
      setIsSubmitSuccess(true)
      setSubmittedQns(question)
      dispatch({ type: QuestionBankSagaActions.GET_ALL_QUESTIONS })
    })
  }

  return (
    <Stack sx={styles.wrapper} gap={1}>
      {!isSubmitSuccess && (
        <Button
          sx={styles.backButton}
          startDecorator={<ArrowBackIcon />}
          variant="plain"
          onClick={() => navigate(SubPaths.ManageQuestions)}
        >
          Back
        </Button>
      )}
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
          Create Question {isSubmitSuccess && 'Success'}
        </Typography>
        {!isSubmitSuccess && (
          <QuestionForm onSubmit={onCreate} submitLoading={loadingCreateQns} />
        )}
        {isSubmitSuccess && submittedQns && (
          <Stack gap={2}>
            <Typography level="body-md">
              You have successfully add a new question to the repository.
            </Typography>
            <img src={success} alt="success" style={styles.successImg} />
            <Typography level="h4">Question summary</Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="bold" level="body-md">
                Title
              </Typography>
              <Typography level="body-md">{submittedQns.title}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="bold" level="body-md">
                Complexity
              </Typography>
              <Typography
                level="body-md"
                color={getComplexityColor(submittedQns.complexity)}
              >
                {submittedQns.complexity}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="bold" level="body-md">
                Categories
              </Typography>
              <Box sx={styles.chipBox}>
                {submittedQns.categories.map((category) => (
                  <Chip key={category} color="primary">
                    {category}
                  </Chip>
                ))}
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="bold" level="body-md">
                Language Templates
              </Typography>
              <Box sx={styles.chipBox}>
                {submittedQns.template.map((template) => (
                  <Chip
                    key={template.langSlug}
                    color="primary"
                    variant="outlined"
                  >
                    {template.language}
                  </Chip>
                ))}
              </Box>
            </Box>
            <Button onClick={() => navigate(SubPaths.ManageQuestions)}>
              Back to Questions
            </Button>
          </Stack>
        )}
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

export default CreateQuestion
