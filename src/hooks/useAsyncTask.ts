import { useState } from 'react'

import { getLoadingTasks } from '../features/common/selectors'
import { useAppSelector } from './useAppSelector'
import useStatefulTask from './useStatefulTask'

export type ErrorHandler = (error: any) => void
export type AsyncTaskOutput<T> = [
  (task: () => Promise<T>) => Promise<void>,
  boolean,
  Error | null,
  (e?: Error) => void,
]

const parseError = (original: Error): Error => {
  let error = original
  return error
}

const useAsyncTask = <T>(
  taskname: string,
  errorHandler?: (error: Error) => void,
): AsyncTaskOutput<T> => {
  const [error, setError] = useState<Error | null>(null)
  const loadingTasks = useAppSelector(getLoadingTasks)

  const cleanup = () => {
    setError(null)
  }

  const statefulTask = useStatefulTask<T>()
  const asyncTaskRunner = async (task: () => Promise<T>): Promise<void> => {
    if (typeof cleanup === 'function') cleanup()

    try {
      await statefulTask(task, taskname)
    } catch (rawError) {
      console.error('async task error', rawError)
      const error = parseError(rawError as any)
      errorHandler?.(error)
      setError(error)
    }
  }

  const setOrCleanError = (error?: Error) => {
    error ? setError(error) : setError(null)
  }

  const loadingState = !!loadingTasks[taskname]

  return [asyncTaskRunner, loadingState, error, setOrCleanError]
}

export default useAsyncTask
