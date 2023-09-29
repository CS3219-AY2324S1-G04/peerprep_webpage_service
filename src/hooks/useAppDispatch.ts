import { useDispatch } from 'react-redux'

import type { AppDispatch } from '../context/store'

export const useAppDispatch: () => AppDispatch = useDispatch
