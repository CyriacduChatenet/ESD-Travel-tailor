import dotenv from 'dotenv';

dotenv.config();

export const API_SIGNIN_ROUTE = `${process.env.API_URL}/auth/signin`;
export const API_SIGNUP_ROUTE = `${process.env.API_URL}/auth/signup`;
export const API_FORGOT_PASSWORD_ROUTE = `${process.env.API_URL}/auth/forgot-password`;
export const API_RESET_PASSWORD_ROUTE = `${process.env.API_URL}/auth/reset-password`;

export const ACCESS_TOKEN = 'accessToken';
export const RESET_TOKEN = 'resetToken';