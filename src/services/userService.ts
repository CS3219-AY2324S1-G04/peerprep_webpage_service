import axios, { AxiosError } from 'axios'

import { store } from '../context/store'
import { getIsDevEnv, getUserServiceBaseUrl } from '../features/config/selector'

export const usernameKey: string = 'username'
export const emailAddressKey: string = 'email-address'
export const userIdKey: string = 'user-id'
export const userRoleKey: string = 'user-role'
export const passwordKey: string = 'password'
export const newPasswordKey: string = 'new-password'
export const sessionTokenKey: string = 'session-token'

export async function createUser(
  info: UserCreationInfo,
  controller?: AbortController,
): Promise<void> {
  try {
    await axios.post(`${getBaseUrl()}/users`, undefined, {
      params: {
        [usernameKey]: info.username,
        [emailAddressKey]: info.emailAddress,
        [passwordKey]: info.password,
      },
      signal: controller?.signal,
      withCredentials: getIsDevEnv(store.getState()),
    })
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      const paramError: CreateUserParamError = {
        username: error.response.data[usernameKey],
        emailAddress: error.response.data[emailAddressKey],
        password: error.response.data[passwordKey],
      }

      error.response.data = paramError
    }

    throw error
  }
}

export async function createSession(
  credential: UserCredential,
  controller?: AbortController,
): Promise<void> {
  await axios.post(`${getBaseUrl()}/sessions`, undefined, {
    params: {
      [usernameKey]: credential.username,
      [passwordKey]: credential.password,
    },
    signal: controller?.signal,
    withCredentials: getIsDevEnv(store.getState()),
  })
}

export async function getUserProfile(
  controller?: AbortController,
): Promise<UserProfile> {
  const data = (
    await axios.get(`${getBaseUrl()}/user/profile`, {
      signal: controller?.signal,
      withCredentials: getIsDevEnv(store.getState()),
    })
  ).data

  return {
    userId: data[userIdKey],
    userRole: data[userRoleKey],
    username: data[usernameKey],
    emailAddress: data[emailAddressKey],
  }
}

export async function updateUserProfile(
  info: UserProfileUpdateInfo,
  controller?: AbortController,
): Promise<void> {
  try {
    await axios.put(`${getBaseUrl()}/user/profile`, undefined, {
      params: {
        [usernameKey]: info.username,
        [emailAddressKey]: info.emailAddress,
      },
      signal: controller?.signal,
      withCredentials: getIsDevEnv(store.getState()),
    })
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      const paramError: UpdateUserProfileParamError = {
        username: error.response.data[usernameKey],
        emailAddress: error.response.data[emailAddressKey],
      }

      error.response.data = paramError
    }

    throw error
  }
}

export async function updatePassword(
  info: UserPasswordUpdateInfo,
  controller?: AbortController,
): Promise<void> {
  try {
    await axios.put(`${getBaseUrl()}/user/password`, undefined, {
      params: {
        [passwordKey]: info.password,
        [newPasswordKey]: info.newPassword,
      },
      signal: controller?.signal,
      withCredentials: getIsDevEnv(store.getState()),
    })
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      const paramError: UpdatePasswordParamError = {
        newPassword: error.response.data[newPasswordKey],
      }

      error.response.data = paramError
    }

    throw error
  }
}

export async function deleteUser(
  info: UserDeletionCredential,
  controller?: AbortController,
): Promise<void> {
  await axios.delete(`${getBaseUrl()}/user`, {
    params: {
      [passwordKey]: info.password,
    },
    signal: controller?.signal,
    withCredentials: getIsDevEnv(store.getState()),
  })
}

function getBaseUrl(): string {
  return getUserServiceBaseUrl(store.getState())
}

export enum UserRole {
  user = 'user',
  maintainer = 'maintainer',
  admin = 'admin',
}

export interface UserProfile {
  readonly userId: number
  readonly userRole: UserRole
  readonly username: string
  readonly emailAddress: string
}

export interface UserCreationInfo {
  readonly username: string
  readonly emailAddress: string
  readonly password: string
}

export interface UserCredential {
  readonly username: string
  readonly password: string
}

export interface UserProfileUpdateInfo {
  readonly username: string
  readonly emailAddress: string
}

export interface UserPasswordUpdateInfo {
  readonly password: string
  readonly newPassword: string
}

export interface UserDeletionCredential {
  readonly password: string
}

export interface CreateUserParamError extends Partial<UserCreationInfo> {}

export interface UpdateUserProfileParamError
  extends Partial<UserProfileUpdateInfo> {}

export interface UpdatePasswordParamError
  extends Partial<UserPasswordUpdateInfo> {}

export default {
  createUser,
  createSession,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  deleteUser,
}
