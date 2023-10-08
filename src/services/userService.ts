import axios, { AxiosResponse } from 'axios'

// TODO: Should be configured via a config
const baseUrl: string = 'http://localhost:3000/user-service'

export async function createUser(
  username: string,
  email: string,
  password: string,
  controller?: AbortController,
): Promise<AxiosResponse> {
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
): Promise<AxiosResponse> {
  return await axios.post(`${baseUrl}/sessions`, undefined, {
    params: {
      username: username,
      password: password,
    },
    signal: controller?.signal,
  })
}
