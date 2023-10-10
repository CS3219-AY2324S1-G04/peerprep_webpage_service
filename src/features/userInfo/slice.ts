// TODO: User info needs to be updated if the user's info changes or the session
// becomes invalidated
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { UserProfile } from '../../services/userService'
import { UserInfoState } from './types'

const initialState: UserInfoState = {
  isLoggedIn: document.cookie.includes('is-logged-in=true'),
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserProfile | undefined>) => {
      state.isLoggedIn = document.cookie.includes('is-logged-in=true')
      state.profile = state.isLoggedIn ? action.payload : undefined
    },
  },
})

export const { updateUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer
