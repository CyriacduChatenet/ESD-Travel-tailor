import { useUser } from '@travel-tailor/contexts'
import { WebNavbar } from '@travel-tailor/ui'
import { PropsWithChildren, useEffect } from 'react'
import { ROUTES } from '@travel-tailor/constants'

import styles from '@/layout/layout.module.scss'
import { TokenService } from '@travel-tailor/services'
import { checkJwtValidity } from '@travel-tailor/utils'

export const Layout = ({ children }: PropsWithChildren) => {
  const { findUserInfo } = useUser()

  useEffect(() => {
    if (
      window.location.pathname !== ROUTES.ROOT &&
      window.location.pathname !== ROUTES.AUTH.SIGNIN &&
      window.location.pathname !== ROUTES.AUTH.SIGNUP &&
      window.location.pathname !== ROUTES.AUTH.RESET_PASSWORD &&
      window.location.pathname !== ROUTES.AUTH.FORGOT_PASSWORD &&
      window.location.pathname !== ROUTES.ADVERTISER.ACTIVITY.LIST
    ) {
      findUserInfo(`${process.env.NEXT_PUBLIC_API_URL}`)
    }
    
    const token = TokenService.getAccessToken()
    if (token) {
      checkJwtValidity(token)
    }
  }, [])

  return (
    <>
      <WebNavbar />
      <main className={styles.main}>{children}</main>
    </>
  )
}
