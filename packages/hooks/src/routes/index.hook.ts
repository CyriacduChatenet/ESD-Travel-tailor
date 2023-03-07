import { useEffect } from 'react'
import { ROUTES } from '@travel-tailor/constants'

export const useProtectedRoute = () => {
  const isAuth = true

  useEffect(() => {
    if (!isAuth) {
      window.location.href = ROUTES.SIGNIN
    }
    return
  }, [])
}
