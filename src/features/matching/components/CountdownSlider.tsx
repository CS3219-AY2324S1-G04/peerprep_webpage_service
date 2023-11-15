import { LinearProgress } from '@mui/joy'
import Color from 'color'
import { useEffect, useState } from 'react'

import { useAppSelector } from '../../../hooks/useAppSelector'
import useTaskSubscriber from '../../../hooks/useTaskSubscriber'
import { LoadingKeys } from '../../../utils/types'
import { getMatchingStartEpoch, getMatchingTimeoutEpoch } from '../selector'

const startColor: Color = new Color('#CF544E')
const endColor: Color = new Color('#88DC88')
const startBackgroundColor: Color = new Color('#781612')
const endBackgroundColor: Color = new Color('#51BC51')

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

  function getColor(startColor: Color, endColor: Color): Color {
    const red =
      startColor.red() +
      ((endColor.red() - startColor.red()) * remainingTimePercentage) / 100
    const green =
      startColor.green() +
      ((endColor.green() - startColor.green()) * remainingTimePercentage) / 100
    const blue =
      startColor.blue() +
      ((endColor.blue() - startColor.blue()) * remainingTimePercentage) / 100

    return Color.rgb(red, green, blue)
  }

  return (
    <LinearProgress
      size="lg"
      determinate
      value={remainingTimePercentage}
      sx={{
        color: getColor(startColor, endColor).toString(),
        backgroundColor: getColor(
          startBackgroundColor,
          endBackgroundColor,
        ).toString(),
      }}
    />
  )
}

export default CountdownSlider
