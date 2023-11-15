import { LinearProgress } from '@mui/joy'
import { useEffect, useState } from 'react'

import { useAppSelector } from '../../../hooks/useAppSelector'
import useTaskSubscriber from '../../../hooks/useTaskSubscriber'
import { LoadingKeys } from '../../../utils/types'
import { getMatchingStartEpoch, getMatchingTimeoutEpoch } from '../selector'

const CountdownSlider: React.FC = () => {
  const [isCheckingStatus] = useTaskSubscriber(
    LoadingKeys.CHECKING_QUEUE_STATUS,
  )

  const matchingStartEpoch = useAppSelector(getMatchingStartEpoch)
  const matchingTimeoutEpoch = useAppSelector(getMatchingTimeoutEpoch)
  const [remainingTimePercentage, setRemainingTimePercentage] = useState(100)
  const [countdownUpdateInterval, setCountdownUpdateInterval] = useState<
    NodeJS.Timeout | undefined
  >(undefined)

  useEffect(() => {
    if (countdownUpdateInterval !== undefined) {
      clearInterval(countdownUpdateInterval)
    }

    setCountdownUpdateInterval(setInterval(updateRemainingTimePercentage, 33))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckingStatus])

  function updateRemainingTimePercentage() {
    if (isNaN(matchingTimeoutEpoch) || isNaN(matchingStartEpoch)) {
      return
    }

    if (
      Date.now() > matchingTimeoutEpoch ||
      matchingStartEpoch > matchingTimeoutEpoch
    ) {
      setRemainingTimePercentage(0)
      return
    }

    const updatedPercentage =
      ((matchingTimeoutEpoch - Date.now()) /
        (matchingTimeoutEpoch - matchingStartEpoch)) *
      100

    setRemainingTimePercentage(updatedPercentage)
  }

  return (
    <LinearProgress size="lg" determinate value={remainingTimePercentage} />
  )
}

export default CountdownSlider
