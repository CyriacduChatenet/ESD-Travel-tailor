import { ACCESS_TOKEN, SIGNIN_TOKEN } from '@travel-tailor/constants'
import Cookies from 'js-cookie';

const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN);
};

const setAccessToken = (accessToken: string) => {
  Cookies.set(ACCESS_TOKEN, accessToken, { expires: 7 });
};

const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN);
};

const getSigninToken = () => {
  return Cookies.get(SIGNIN_TOKEN);
};

const setSigninToken = (signinToken: string) => {
  Cookies.set(SIGNIN_TOKEN, signinToken, { expires: 7 });
};

const removeSigninToken = () => {
  Cookies.remove(SIGNIN_TOKEN);
};

const clearAll = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(SIGNIN_TOKEN);
};

export const TokenService = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getSigninToken,
  setSigninToken,
  removeSigninToken,
  clearAll,
};