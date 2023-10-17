// TODO: State needs to be updated if the user's info changes or the session
// gets invalidated
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { UserProfile } from '../../services/userService'
import { UserState } from './types'

const initialState: UserState = {
  isLoggedIn: isLoggedIn(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateIsLoggedIn: (state) => {
      state.isLoggedIn = isLoggedIn()
    },
    setUserProfile: (state, action: PayloadAction<UserProfile | undefined>) => {
      state.userProfile = action.payload
    },
  },
})

function isLoggedIn() {
  return document.cookie.includes('is-logged-in=true')
}

export const { updateIsLoggedIn, setUserProfile } = userSlice.actions

export default userSlice.reducer
