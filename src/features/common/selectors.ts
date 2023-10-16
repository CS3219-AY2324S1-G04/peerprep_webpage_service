import { RootState } from '../../context/store'

export const getLoadingTasks = (state: RootState) => state.common.loadingTasks
