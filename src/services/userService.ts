import axios, { AxiosError } from 'axios'

// TODO: Should be configured via a config
const baseUrl: string = 'http://localhost:3000/user-service'

export const usernameKey: string = 'username'
export const emailAddressKey: string = 'email-address'
export const userIdKey: string = 'user-id'
export const userRoleKey: string = 'user-role'
export const passwordKey: string = 'password'
export const sessionTokenKey: string = 'session-token'

export async function createUser(
  info: UserCreationInfo,
  controller?: AbortController,
): Promise<void> {
  try {
    return await axios.post(`${baseUrl}/users`, undefined, {
      params: {
        [usernameKey]: info.username,
        [emailAddressKey]: info.emailAddress,
        [passwordKey]: info.password,
      },
      signal: controller?.signal,
    })
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      const paramError: CreateUserParamError = {
        username: error.response.data[usernameKey],
        emailAddress: error.response.data[emailAddressKey],
        password: error.response.data[passwordKey],
      }

      error.response.data = paramError
      throw error
    }
  }
}

export async function createSession(
  credential: LoginCredential,
  controller?: AbortController,
): Promise<void> {
  return await axios.post(`${baseUrl}/sessions`, undefined, {
    params: {
      [usernameKey]: credential.username,
      [passwordKey]: credential.password,
    },
    signal: controller?.signal,
  })
}

export async function getUserProfile(
  controller?: AbortController,
): Promise<UserProfile> {
  const data = (
    await axios.get(`${baseUrl}/user/profile`, {
      signal: controller?.signal,
    })
  ).data

  return {
    userId: data[userIdKey],
    userRole: data[userRoleKey],
    username: data[usernameKey],
    emailAddress: data[emailAddressKey],
  }
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

export interface LoginCredential {
  readonly username: string
  readonly password: string
}

export interface CreateUserParamError {
  readonly username?: string
  readonly emailAddress?: string
  readonly password?: string
}

export default { createUser, createSession, getUserProfile }
