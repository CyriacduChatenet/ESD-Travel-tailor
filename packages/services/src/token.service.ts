import { ACCESS_TOKEN, SIGNIN_TOKEN } from '@travel-tailor/constants'

const getCookie = (name: string) => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
  }
};

const setCookie = (name: string, value: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=${value}; path=/`;
  }
};

const removeCookie = (name: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

const getAccessToken = () => {
  return getCookie(ACCESS_TOKEN);
};

const setAccessToken = (accessToken: string) => {
  setCookie(ACCESS_TOKEN, accessToken);
};

const removeAccessToken = () => {
  removeCookie(ACCESS_TOKEN);
};

const getSigninToken = () => {
  return getCookie(SIGNIN_TOKEN);
};

const setSigninToken = (signinToken: string) => {
  setCookie(SIGNIN_TOKEN, signinToken);
};

const removeSigninToken = () => {
  removeCookie(SIGNIN_TOKEN);
};

const clearAll = () => {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    removeCookie(cookie[0]);
  }
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