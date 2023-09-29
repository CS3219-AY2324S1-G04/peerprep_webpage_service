import { TypedUseSelectorHook, useSelector } from 'react-redux'

import type { RootState } from '../context/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
