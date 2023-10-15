import { useEffect, useState } from 'react'

import { getLoadingTasks } from '../features/common/selectors'
import { useAppSelector } from './useAppSelector'

const useTaskSubscriber = (...tasks: string[]) => {
  const loadingTasks = useAppSelector(getLoadingTasks)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    for (const key of tasks) if (loadingTasks[key]) return setLoading(true)
    setLoading(false)
  }, [loadingTasks, tasks])
  return [loading]
}

export default useTaskSubscriber
