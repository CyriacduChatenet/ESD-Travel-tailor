import { ACCESS_TOKEN, SIGNIN_TOKEN } from '@travel-tailor/constants';

const getAccessToken = () => {
	return localStorage.getItem(ACCESS_TOKEN);
};

const setAccessToken = (accessToken: string) => {
	localStorage.setItem(ACCESS_TOKEN, accessToken);
};

const removeAccessToken = () => {
	localStorage.removeItem(ACCESS_TOKEN);
};

const getSigninToken = () => {
	return localStorage.getItem(SIGNIN_TOKEN);
};

const setSigninToken = (signinToken: string) => {
	localStorage.setItem(SIGNIN_TOKEN, signinToken);
};

const removeSigninToken = () => {
	localStorage.removeItem(SIGNIN_TOKEN);
};

export const TokenService = {
	getAccessToken,
	setAccessToken,
    removeAccessToken,
    getSigninToken,
    setSigninToken,
    removeSigninToken
};
