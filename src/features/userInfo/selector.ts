import { RootState } from '../../context/store'

export const selectIsLoggedIn = (state: RootState) => state.userInfo.isLoggedIn

export const selectProfile = (state: RootState) => state.userInfo.profile

export const selectUserId = (state: RootState) => state.userInfo.profile?.userId

export const selectUserRole = (state: RootState) =>
  state.userInfo.profile?.userRole

export const selectUsername = (state: RootState) =>
  state.userInfo.profile?.username

export const selectEmail = (state: RootState) => state.userInfo.profile?.email
