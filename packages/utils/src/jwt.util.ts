import { jwtDecode } from '@travel-tailor/functions';
import { TokenService } from '@travel-tailor/services';

export const checkJwtValidity = () => {
    const token = TokenService.getAccessToken();

  if (token) {
    try {
      const decodedToken = jwtDecode(token) as { exp: number };
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired
        console.error('Token has expired');
        // Vous pouvez ajouter ici le code pour gérer le cas où le token a expiré
      } else {
        // Token is still valid
        console.log('Token is still valid');
        // Vous pouvez ajouter ici le code pour gérer le cas où le token est valide
      }
    } catch (error) {
      // Token is invalid
      console.error('Invalid token');
      // Vous pouvez ajouter ici le code pour gérer le cas où le token est invalide
    }
  } else {
    // Token is not present in local storage
    console.log('Token not present in local storage');
    // Vous pouvez ajouter ici le code pour gérer le cas où le token n'est pas présent dans le local storage
  }
};