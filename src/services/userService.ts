import axios from 'axios'

// TODO: Should be configured via a config
const baseUrl: string = 'http://localhost:3000/user-service'

export async function createUser(
  username: string,
  email: string,
  password: string,
  controller?: AbortController,
): Promise<void> {
  return await axios.post(`${baseUrl}/users`, undefined, {
    params: {
      username: username,
      email: email,
      password: password,
    },
    signal: controller?.signal,
  })
}

export async function createSession(
  username: string,
  password: string,
  controller?: AbortController,
): Promise<void> {
  return await axios.post(`${baseUrl}/sessions`, undefined, {
    params: {
      username: username,
      password: password,
    },
    signal: controller?.signal,
  })
}

export async function getUserProfile(
  controller?: AbortController,
): Promise<UserProfile> {
  return (
    await axios.get(`${baseUrl}/user/profile`, {
      signal: controller?.signal,
    })
  ).data
}

export enum UserRole {
  user = 'user',
  maintainer = 'maintainer',
  admin = 'admin',
}

export interface UserProfile {
  readonly id: number
  readonly role: UserRole
  readonly username: string
  readonly email: string
}

export default { createUser, createSession, getUserProfile }
