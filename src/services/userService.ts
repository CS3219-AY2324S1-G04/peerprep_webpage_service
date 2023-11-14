import axios, { AxiosError } from 'axios'

import { isDevEnv, userServiceBaseUrl } from '../utils/config'
import { SimpleMap } from '../utils/types'

const usernameKey: string = 'username'
const emailAddressKey: string = 'email-address'
const userIdKey: string = 'user-id'
const userRoleKey: string = 'user-role'
const passwordKey: string = 'password'
const newPasswordKey: string = 'new-password'
const accessTokenExpiryKey: string = 'access-token-expiry'
const userIdsKey: string = 'user-ids'

const fetchAccessTokenEndpoint: string = `${userServiceBaseUrl}/session/access-token`

export async function createUser(
  info: UserCreationInfo,
  controller?: AbortController,
): Promise<void> {
  try {
    await axios.post(`${userServiceBaseUrl}/users`, undefined, {
      params: {
        [usernameKey]: info.username,
        [emailAddressKey]: info.emailAddress,
        [passwordKey]: info.password,
      },
      signal: controller?.signal,
      withCredentials: isDevEnv,
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
  await axios.post(`${userServiceBaseUrl}/sessions`, undefined, {
    params: {
      [usernameKey]: credential.username,
      [passwordKey]: credential.password,
    },
    signal: controller?.signal,
    withCredentials: isDevEnv,
  })
}

export async function fetchAccessToken(controller?: AbortController) {
  await axios.get(fetchAccessTokenEndpoint, {
    signal: controller?.signal,
    withCredentials: isDevEnv,
  })
}

export async function deleteSession(controller?: AbortController) {
  await axios.delete(`${userServiceBaseUrl}/session`, {
    signal: controller?.signal,
    withCredentials: isDevEnv,
  })
}

export async function fetchUserProfile(
  controller?: AbortController,
): Promise<UserProfile> {
  const data = (
    await axios.get(`${userServiceBaseUrl}/user/profile`, {
      signal: controller?.signal,
      withCredentials: isDevEnv,
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
    await axios.put(`${userServiceBaseUrl}/user/profile`, undefined, {
      params: {
        [usernameKey]: info.username,
        [emailAddressKey]: info.emailAddress,
      },
      signal: controller?.signal,
      withCredentials: isDevEnv,
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
    await axios.put(`${userServiceBaseUrl}/user/password`, undefined, {
      params: {
        [passwordKey]: info.password,
        [newPasswordKey]: info.newPassword,
      },
      signal: controller?.signal,
      withCredentials: isDevEnv,
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
  await axios.delete(`${userServiceBaseUrl}/user`, {
    params: {
      [passwordKey]: info.password,
    },
    signal: controller?.signal,
    withCredentials: isDevEnv,
  })
}

async function getUsernames(userIds: number[]): Promise<SimpleMap<string>> {
  const res = await axios.get(`${userServiceBaseUrl}/users/all/username`, {
    params: {
      [userIdsKey]: JSON.stringify(userIds),
    },
    withCredentials: isDevEnv,
  })
  return res.data ?? {}
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
  accessTokenExpiryKey,
  fetchAccessTokenEndpoint,
  createUser,
  createSession,
  fetchAccessToken,
  deleteSession,
  fetchUserProfile,
  updateUserProfile,
  updatePassword,
  deleteUser,
  getUsernames,
}
