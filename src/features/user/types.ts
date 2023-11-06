import { UserProfile } from '../../services/userService'

export const cookieIsLoggedInKey = 'is-logged-in'

export interface UserState {
  // "undefined" if user is not logged in
  accessTokenExpiry?: number

  // "undefined" if user profile has not been fetched or user is not logged in
  userProfile?: UserProfile
}

export const UserSagaActions = {
  LOGIN: '@userInfo/LOGIN',
  LOGOUT: '@userInfo/LOGOUT',
  FETCH_USER_PROFILE: '@userInfo/FETCH_USER_PROFILE',
  DELETE_USER: '@userInfo/DELETE_USER',
}
