import { RootState } from '../../context/store'

export const selectIsLoggedIn = (state: RootState) => state.userInfo.isLoggedIn

export const selectProfile = (state: RootState) => state.userInfo.profile

export const selectId = (state: RootState) => state.userInfo.profile?.id

export const selectRole = (state: RootState) => state.userInfo.profile?.role

export const selectUsername = (state: RootState) =>
  state.userInfo.profile?.username

export const selectEmail = (state: RootState) => state.userInfo.profile?.email
