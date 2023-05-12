import { ACCESS_TOKEN, SIGNIN_TOKEN } from '@travel-tailor/constants'

const getAccessToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN)
}

const setAccessToken = (accessToken: string) => {
  window.localStorage.setItem(ACCESS_TOKEN, accessToken)
}

const removeAccessToken = () => {
  window.localStorage.removeItem(ACCESS_TOKEN)
}

const getSigninToken = () => {
  return window.localStorage.getItem(SIGNIN_TOKEN)
}

const setSigninToken = (signinToken: string) => {
  window.localStorage.setItem(SIGNIN_TOKEN, signinToken)
}

const removeSigninToken = () => {
  window.localStorage.removeItem(SIGNIN_TOKEN)
}

export const TokenService = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getSigninToken,
  setSigninToken,
  removeSigninToken,
}
