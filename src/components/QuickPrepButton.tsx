import { Button, ButtonProps } from '@mui/joy'
import { AxiosError, AxiosResponse } from 'axios'

import { addLoadingTask, removeLoadingTask } from '../features/common/slice'
import { updateMatchingEpoch } from '../features/matching/slice'
import { MatchingSagaActions } from '../features/matching/types'
import { getCategories, getLanguages } from '../features/questionBank/selectors'
import { QuestionComplexity } from '../features/questionBank/types'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import useAsyncTask from '../hooks/useAsyncTask'
import matchingService from '../services/matchingService'
import { LoadingKeys } from '../utils/types'
import { toast } from './Toaster/toast'

const QuickPrepButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { ...rest } = props
  const dispatch = useAppDispatch()
  const allCategories = useAppSelector(getCategories)
  const allLanguages = useAppSelector(getLanguages)
  const [runQuickPrep, loadingQuickPrep] = useAsyncTask(
    'quickPrep',
    (error) => {
      toast.error(
        error?.message ??
          'Oops! We encountered an error, sorry about that. Please try again later',
      )
    },
  )

  const onQuickPrep = () => {
    const complexityEnumValues = Object.values(QuestionComplexity) as string[]
    const randomEnumIndex = Math.floor(
      Math.random() * complexityEnumValues.length,
    )
    const randomComplexity = complexityEnumValues[randomEnumIndex]

    const randomCategoryIndex = Math.floor(Math.random() * allCategories.length)
    const randomCategory = allCategories[randomCategoryIndex]

    const randomLanguageIndex = Math.floor(Math.random() * allLanguages.length)
    const randomLanguage = allLanguages[randomLanguageIndex]

    runQuickPrep(async () => {
      try {
        dispatch(addLoadingTask(LoadingKeys.QUICK_PREP))

        const response: AxiosResponse = await matchingService.joinQueue({
          complexity: randomComplexity as QuestionComplexity,
          categories: [randomCategory],
          language: randomLanguage.langSlug ?? 'java',
        })

        dispatch(
          updateMatchingEpoch({
            startEpoch: Date.now(),
            timeoutEpoch: new Date(response.data.data.expireAt).getTime(),
          }),
        )
        dispatch({ type: MatchingSagaActions.START_CHECK_QUEUE_STATUS })
        dispatch(addLoadingTask(LoadingKeys.CHECKING_QUEUE_STATUS))
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            toast.error('Join Queue failed: Already in queue')
          }
        } else {
          toast.error('Join Queue failed: Please try again later')
        }
        dispatch(removeLoadingTask(LoadingKeys.QUICK_PREP))
      }
    })
  }

  return (
    <Button
      size="md"
      {...rest}
      onClick={() => onQuickPrep()}
      loading={loadingQuickPrep}
    >
      QuickPrep 🚀
    </Button>
  )
}

export default QuickPrepButton
