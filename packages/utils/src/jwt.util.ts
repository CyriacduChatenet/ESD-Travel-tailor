import { jwtDecode } from '@travel-tailor/functions';
import { AccessToken } from '@travel-tailor/types';
import { ROUTES } from '@travel-tailor/constants';
import { TokenService } from '@travel-tailor/services'

export const checkJwtValidity = (token: string) => {
    const decodedToken: AccessToken = jwtDecode(token);

    if(decodedToken.exp < Date.now()) {
        TokenService.removeAccessToken();
        window.location.pathname = ROUTES.AUTH.SIGNIN;
    }
};