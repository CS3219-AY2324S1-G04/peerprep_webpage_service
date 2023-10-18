import { UserProfile } from '../../services/userService'

export interface UserState {
  isLoggedIn: boolean

  // "undefined" if user profile has not been fetched or user is not logged in
  userProfile?: UserProfile
}

export const UserSagaActions = {
  CREATE_SESSION: '@userInfo/CREATE_SESSION',
  // DELETE_SESSION: '@userInfo/DELETE_SESSION', // TODO:
  GET_USER_PROFILE: '@userInfo/GET_USER_PROFILE',
  DELETE_USER: '@userInfo/DELETE_USER',
}
