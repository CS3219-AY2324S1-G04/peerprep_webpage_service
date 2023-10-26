// TODO: State needs to be updated if the user's info changes or the session
// gets invalidated
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { UserProfile } from '../../services/userService'
import { UserState, cookieIsLoggedInKey } from './types'

const cookieIsLoggedInExpiry: Date = new Date((Math.pow(2, 31) - 1) * 1000)

const initialState: UserState = {
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      document.cookie = `${cookieIsLoggedInKey}=${action.payload}; expires=${cookieIsLoggedInExpiry}`
      state.isLoggedIn = action.payload
      if (!action.payload) {
        state.userProfile = undefined
      }
    },
    setUserProfile: (state, action: PayloadAction<UserProfile | undefined>) => {
      state.userProfile = action.payload
    },
  },
})

export const { setIsLoggedIn, setUserProfile } = userSlice.actions

export default userSlice.reducer
