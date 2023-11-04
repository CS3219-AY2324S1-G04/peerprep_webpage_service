import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import userService, { UserProfile } from '../../services/userService'
import { UserState } from './types'

function getAccessTokenExpiryFromCookie(): number | undefined {
  const rawExpiry: string | undefined = Cookies.get(
    userService.accessTokenExpiryKey,
  )

  if (rawExpiry === undefined) {
    return undefined
  }

  const expiry: number = new Date(rawExpiry).getTime()

  if (isNaN(expiry)) {
    return undefined
  }

  return expiry
}

const initialState: UserState = {
  accessTokenExpiry: getAccessTokenExpiryFromCookie(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAccessTokenExpiry: (state) => {
      state.accessTokenExpiry = getAccessTokenExpiryFromCookie()
    },
    removeAccessTokenExpiry: (state) => {
      Cookies.remove(userService.accessTokenExpiryKey)
      state.accessTokenExpiry = undefined
    },
    setUserProfile: (state, action: PayloadAction<UserProfile | undefined>) => {
      state.userProfile = action.payload
    },
  },
})

export const {
  updateAccessTokenExpiry,
  removeAccessTokenExpiry,
  setUserProfile,
} = userSlice.actions

export default userSlice.reducer
