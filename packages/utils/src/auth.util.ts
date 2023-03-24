import { TokenService } from "@travel-tailor/services";

export const authUtil = typeof window !== 'undefined' && (TokenService.getAccessToken() || TokenService.getSigninToken()) ? true : false

export const testEmailUtil = (email: string) => {
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return emailRegex.test(email)
};