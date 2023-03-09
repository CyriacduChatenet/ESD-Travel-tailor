import { TokenService } from "@travel-tailor/services";

export const authUtil = typeof window !== 'undefined' && TokenService.getAccessToken() ? true : false