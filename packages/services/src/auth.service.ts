import {
  AccessToken,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  SigninDTO,
  SignupDTO,
  User,
} from '@travel-tailor/types'
import { useFetch } from '@travel-tailor/hooks'
import { Dispatch, SetStateAction, jwtDecode } from '@travel-tailor/functions'
import { API_GOOGLE_AUTH, API_RESET_PASSWORD_ROUTE, ROUTES } from '@travel-tailor/constants'

import { TokenService } from './token.service'

const signin = async (api_url: string, signinCredentials: SigninDTO, setError: Dispatch<SetStateAction<any>> | any) => {
  try {
    const token = await useFetch.post(api_url, signinCredentials, setError)
    TokenService.setAccessToken(token.accessToken)
    const tokenDecode = jwtDecode(token.accessToken) as AccessToken
    return tokenDecode
  } catch (error) {
    setError(error)
  }
}

const signinWithGoogle = async (api_url: string, value: { accessToken: string }, setError: Dispatch<SetStateAction<any>> | any) => {
  try {
    const response = await useFetch.post(`${api_url}${API_GOOGLE_AUTH}`, { access_token: value.accessToken }, setError)
  } catch (error) {
    console.error(error);
  }
};

const signup = async (api_url: string, signupCredentials: SignupDTO, setError: Dispatch<SetStateAction<any>> | any): Promise<User> => {
  const { user, signinToken } = await useFetch.post(api_url, signupCredentials, setError)
  TokenService.setSigninToken(signinToken)
  return user
}

const logout = () => {
  TokenService.removeAccessToken()
  location.pathname = ROUTES.AUTH.SIGNIN
}

const forgotPassword = async (
  api_url: string,
  forgotPasswordCredentials: ForgotPasswordDTO,
  setError: Dispatch<SetStateAction<any>> | any
) => {
  return await useFetch.post(api_url, forgotPasswordCredentials, setError)
}

const resetPassword = async (api_url: string, resetToken: string, resetPasswordCredentials : ResetPasswordDTO, setError: Dispatch<SetStateAction<any>> | any): Promise<User> => {
  return await useFetch.post(`${api_url}${API_RESET_PASSWORD_ROUTE}/${resetToken}`, resetPasswordCredentials, setError);
}

export const AuthService = {
  signin,
  signinWithGoogle,
  signup,
  forgotPassword,
  resetPassword,
  logout,
}
