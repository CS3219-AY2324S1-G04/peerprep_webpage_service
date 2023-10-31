import { RootState } from '../../context/store'

export const getIsLoggedIn = (state: RootState) =>
  state.user.accessTokenExpiry !== undefined

export const getAccessTokenExpiry = (state: RootState) =>
  state.user.accessTokenExpiry === undefined
    ? undefined
    : new Date(state.user.accessTokenExpiry)

export const getUserProfile = (state: RootState) => state.user.userProfile

export const getUserId = (state: RootState) => state.user.userProfile?.userId

export const getUserRole = (state: RootState) =>
  state.user.userProfile?.userRole

export const getUsername = (state: RootState) =>
  state.user.userProfile?.username

export const getEmailAddress = (state: RootState) =>
  state.user.userProfile?.emailAddress
