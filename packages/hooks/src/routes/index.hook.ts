import { useEffect } from 'react';
import { ROUTES } from '@travel-tailor/constants';

export const useProtectedRoute = (token:  string | boolean) => {
  const isAuth = token

  useEffect(() => {
    if (!isAuth) {
      window.location.href = ROUTES.SIGNIN
    }
    return
  }, [])
}
