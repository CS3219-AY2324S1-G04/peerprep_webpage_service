import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { store } from '../../context/store'
import userService from '../../services/userService'
import { getAccessTokenExpiry } from './selector'
import { removeAccessTokenExpiry } from './slice'

const accessTokenExpiryToleranceMillis: number = 120000

let reqInterceptor: number | undefined = undefined
let resInterceptor: number | undefined = undefined

export function applyAxiosInterceptorForUpdatingAccessToken() {
  ejectAxiosInterceptorForUpdatingAccessToken()

  reqInterceptor = axios.interceptors.request.use(handleRequest)
  resInterceptor = axios.interceptors.response.use(
    (res) => res,
    handleErrorResponse,
  )
}

export function ejectAxiosInterceptorForUpdatingAccessToken() {
  if (reqInterceptor !== undefined) {
    axios.interceptors.request.eject(reqInterceptor)
  }

  if (resInterceptor !== undefined) {
    axios.interceptors.response.eject(resInterceptor)
  }
}

async function handleRequest(config: InternalAxiosRequestConfig) {
  if (config.url === userService.fetchAccessTokenEndpoint) {
    return config
  }

  if (shouldRefreshToken()) {
    await userService.fetchAccessToken()
  }

  return config
}

function shouldRefreshToken() {
  const accessTokenExpiry: number | undefined = getAccessTokenExpiry(
    store.getState(),
  )?.getTime()
  const minRefreshDateTime: number =
    Date.now() - accessTokenExpiryToleranceMillis

  return (
    accessTokenExpiry !== undefined && accessTokenExpiry <= minRefreshDateTime
  )
}

function handleErrorResponse(error: AxiosError): Promise<never> {
  if (isSessionInvalid(error)) {
    store.dispatch(removeAccessTokenExpiry())
  }

  return Promise.reject(error)
}

function isSessionInvalid(error: AxiosError): boolean {
  return (
    (error.response?.status === 401 &&
      error.response?.data === 'Session is invalid.') ||
    error.response?.status === 407
  )
}

export default {
  applyAxiosInterceptorForUpdatingAccessToken,
  ejectAxiosInterceptorForUpdatingAccessToken,
}
