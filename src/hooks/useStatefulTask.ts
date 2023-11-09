import { addLoadingTask, removeLoadingTask } from '../features/common/slice'
import { useAppDispatch } from './useAppDispatch'

const timestamp = Math.floor(new Date().getTime() / 1000).toString()

const useStatefulTask = <T>() => {
  const dispatch = useAppDispatch()
  return async (
    runnable: () => Promise<T>,
    taskName = `task-${timestamp}`,
  ): Promise<T> => {
    if (typeof runnable !== 'function')
      throw new Error('stateful task runnable not a function')
    dispatch(addLoadingTask(taskName))
    try {
      return await runnable()
    } finally {
      dispatch(removeLoadingTask(taskName))
    }
  }
}

export default useStatefulTask
