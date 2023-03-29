import { jwtDecode, useEffect } from '@travel-tailor/functions';
import { ROLES, ROUTES } from '@travel-tailor/constants';
import { AccessToken } from '@travel-tailor/types';
import { TokenService } from '@travel-tailor/services';

export const useProtectedRoute = (isAuth: boolean) => {

  useEffect(() => {
    const token = TokenService.getAccessToken() || TokenService.getSigninToken();
    if (!isAuth) {
      window.location.href = ROUTES.AUTH.SIGNIN

      const decodedToken = jwtDecode(`${token}`) as AccessToken;

      if (decodedToken) {
        const { exp } = decodedToken;
        const now = new Date().getTime() / 1000;

        if (exp < now) {
          window.location.href = ROUTES.AUTH.SIGNIN;
        }
      }
    }
  }, [])
}

export const useAdminProtectedRoute = (isAuth: boolean) => {
  useEffect(() => {
    if(!isAuth) {
      window.location.href = ROUTES.AUTH.SIGNIN
    }
    const token = TokenService.getAccessToken() || TokenService.getSigninToken();
    
    const decodedToken = jwtDecode(`${token}`) as AccessToken;

    if(window.location.pathname === ROUTES.ADMIN.DASHBOARD && decodedToken.roles !== ROLES.ADMIN) {
      window.location.pathname = ROUTES.AUTH.SIGNIN;
    }
  }, [])
}

export const useAdvertiserProtectedRoute = (isAuth: boolean) => {
  useEffect(() => {
    if(!isAuth) {
      window.location.href = ROUTES.AUTH.SIGNIN
    }
    const token = TokenService.getAccessToken() || TokenService.getSigninToken();
    
    const decodedToken = jwtDecode(`${token}`) as AccessToken;

    if(window.location.pathname === ROUTES.ADVERTISER.DASHBOARD && decodedToken.roles !== ROLES.ADVERTISER) {
      window.location.pathname = ROUTES.AUTH.SIGNIN;
    }
  }, [])
}

export const useTravelerProtectedRoute = (isAuth: boolean) => {
  useEffect(() => {
    if(!isAuth) {
      window.location.href = ROUTES.AUTH.SIGNIN
    }
    const token = TokenService.getAccessToken() || TokenService.getSigninToken();
    
    const decodedToken = jwtDecode(`${token}`) as AccessToken;

    if(window.location.pathname === ROUTES.TRAVELER.DASHBOARD && decodedToken.roles !== ROLES.TRAVELER) {
      window.location.pathname = ROUTES.AUTH.SIGNIN;
    }
  }, [])
}