import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { createUser } from '../../services/userService'
import {
  FieldInfo,
  ServerParamErrorInfo,
  SignUpFormInfoState,
  SubmissionStatus,
} from './types'

const initialState: SignUpFormInfoState = {
  email: { value: '' },
  username: { value: '' },
  password: { value: '' },
  confirmPassword: { value: '' },
  submissionStatus: SubmissionStatus.yetToSubmit,
}

export const submitForm = createAsyncThunk<
  undefined,
  SignUpFormInfoState,
  {
    rejectValue: ServerParamErrorInfo
  }
>('user-service/users/post', async (state: SignUpFormInfoState, thunkApi) => {
  try {
    await createUser(
      state.username.value,
      state.email.value,
      state.password.value,
    )
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 400) {
      return thunkApi.rejectWithValue(e.response?.data ?? {})
    }

    return thunkApi.rejectWithValue({})
  }
})

const signUpFormSlice = createSlice({
  name: 'signUpForm',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<FieldInfo>) => {
      state.email = action.payload
    },
    setUsername: (state, action: PayloadAction<FieldInfo>) => {
      state.username = action.payload
    },
    setPassword: (state, action: PayloadAction<FieldInfo>) => {
      state.password = action.payload
    },
    setConfirmPassword: (state, action: PayloadAction<FieldInfo>) => {
      state.confirmPassword = action.payload
    },
    resetForm: (state) => {
      state.email = initialState.email
      state.username = initialState.username
      state.password = initialState.password
      state.confirmPassword = initialState.confirmPassword
      state.submissionStatus = initialState.submissionStatus
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitForm.pending, (state) => {
      state.submissionStatus = SubmissionStatus.submitting
    })
    builder.addCase(submitForm.fulfilled, (state) => {
      state.submissionStatus = SubmissionStatus.succeeded
    })
    builder.addCase(submitForm.rejected, (state, action) => {
      if (
        action.payload === undefined ||
        Object.keys(action.payload).length === 0
      ) {
        state.submissionStatus = SubmissionStatus.failedErrorUnknown
        return
      }

      state.submissionStatus = SubmissionStatus.failedErrorKnown

      state.email.errorMessage = action.payload?.email
      state.username.errorMessage = action.payload?.username
      state.password.errorMessage = action.payload?.password
    })
  },
})

export const {
  setEmail,
  setUsername,
  setPassword,
  setConfirmPassword,
  resetForm,
} = signUpFormSlice.actions

export default signUpFormSlice.reducer
