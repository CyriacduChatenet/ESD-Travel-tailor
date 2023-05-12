import { ACCESS_TOKEN, SIGNIN_TOKEN } from '@travel-tailor/constants'

const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN)
  }
}

const setAccessToken = (accessToken: string) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(ACCESS_TOKEN, accessToken)
  }
}

const removeAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(ACCESS_TOKEN)
  }
}

const getSigninToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(SIGNIN_TOKEN)
  }
}

const setSigninToken = (signinToken: string) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(SIGNIN_TOKEN, signinToken)
  }
}

const removeSigninToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(SIGNIN_TOKEN)
  }
}

export const TokenService = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getSigninToken,
  setSigninToken,
  removeSigninToken,
}
