import { RootState } from '../../context/store'

export const selectIsLoggedIn = (state: RootState) =>
  state.loginStatus.isLoggedIn
