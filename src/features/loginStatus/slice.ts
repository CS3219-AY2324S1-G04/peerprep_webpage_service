import { createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosResponse } from 'axios'

import { store } from '../../context/store'
import { LoginStatusState } from './types'

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    store.dispatch(updateStatus())
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      document.cookie = `is-logged-in=false`
      store.dispatch(updateStatus())
    }

    return Promise.reject(error)
  },
)

const initialState: LoginStatusState = {
  isLoggedIn: false,
}

const loginStatusSlice = createSlice({
  name: 'loginStatus',
  initialState,
  reducers: {
    updateStatus: (state) => {
      state.isLoggedIn = document.cookie.includes('is-logged-in=true')
    },
  },
})

const { updateStatus } = loginStatusSlice.actions

export default loginStatusSlice.reducer
