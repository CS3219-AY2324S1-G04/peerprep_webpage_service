import { createSlice } from '@reduxjs/toolkit'

import { Config } from './types'

const initialState: Config = new Config()

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
})

export default configSlice.reducer
