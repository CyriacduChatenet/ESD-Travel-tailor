import { jwtDecode } from '@travel-tailor/functions';
import { TokenService } from '@travel-tailor/services';
import { ROUTES } from '@travel-tailor/constants';

export const checkJwtValidity = () => {
  const token = TokenService.getAccessToken();

  if (token !== null && token !== undefined && typeof token === 'string') {
    try {
      const decodedToken = jwtDecode(token) as { exp: number };
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired
        console.error('Token has expired');
        window.location.pathname = ROUTES.AUTH.SIGNIN;
        TokenService.removeAccessToken();
        // Vous pouvez ajouter ici le code pour gérer le cas où le token a expiré
      } else {
        // Token is still valid
        return true;
        // Vous pouvez ajouter ici le code pour gérer le cas où le token est valide
      }
    } catch (error) {
      // Token is invalid
      console.error('Invalid token');
      window.location.pathname = ROUTES.AUTH.SIGNIN;
      TokenService.removeAccessToken();
      // Vous pouvez ajouter ici le code pour gérer le cas où le token est invalide
    }
  } else {
    // Token is not present in local storage
    console.error('Token not present in local storage');
    window.location.pathname = ROUTES.AUTH.SIGNIN;
    // Vous pouvez ajouter ici le code pour gérer le cas où le token n'est pas présent dans le local storage
  }
};