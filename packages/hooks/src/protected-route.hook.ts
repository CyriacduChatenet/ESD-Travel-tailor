import { useEffect } from '@travel-tailor/functions';
import { ROUTES } from '@travel-tailor/constants';

export const useProtectedRoute = (token:  string | boolean) => {
  const isAuth = token

  useEffect(() => {
    if (!isAuth) {
      window.location.href = ROUTES.AUTH.SIGNIN
    }
    return
  }, [])
}
