import {
  AccessToken,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  SigninDTO,
  SignupDTO,
  User,
} from '@travel-tailor/types'
import { useFetch } from '@travel-tailor/hooks'
import { jwtDecode } from '@travel-tailor/functions'
import { API_RESET_PASSWORD_ROUTE, ROUTES } from '@travel-tailor/constants'

import { TokenService } from '../tokens/token.service'

const signin = async (api_url: string, signinCredentials: SigninDTO): Promise<AccessToken> => {
  const token = await useFetch.post(api_url, signinCredentials)
  TokenService.setAccessToken(token.accessToken)
  const tokenDecode = jwtDecode(token.accessToken) as AccessToken
  return tokenDecode
}

const signup = async (api_url: string, signupCredentials: SignupDTO): Promise<User> => {
  const { user, signinToken } = await useFetch.post(api_url, signupCredentials)
  TokenService.setSigninToken(signinToken)
  return user
}

const logout = () => {
  TokenService.removeAccessToken()
  location.pathname = ROUTES.AUTH.SIGNIN
}

const forgotPassword = async (
  api_url: string,
  forgotPasswordCredentials: ForgotPasswordDTO
) => {
  return await useFetch.post(api_url, forgotPasswordCredentials)
}

const resetPassword = async (api_url: string, resetToken: string, resetPasswordCredentials : ResetPasswordDTO): Promise<User> => {
  return await useFetch.post(`${api_url}${API_RESET_PASSWORD_ROUTE}/${resetToken}`, resetPasswordCredentials);
}

export const AuthService = {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  logout,
}
