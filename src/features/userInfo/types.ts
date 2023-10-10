import { UserProfile } from '../../services/userService'

export interface UserInfoState {
  isLoggedIn: boolean

  // "undefined" if user profile has not been fetched or user is not logged in
  profile?: UserProfile
}
