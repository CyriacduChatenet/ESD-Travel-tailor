import { ROLES, ROUTES } from '@travel-tailor/constants'
import { useUser } from '@travel-tailor/contexts'
import { FC, NextImage, NextLink } from '@travel-tailor/functions'

import { WebButton } from '../../../atoms/button/react'

import styles from './style.module.scss'

export const WebNavbar: FC = () => {
  const { user } = useUser()
  return (
    <nav className={styles.navbar}>
      <NextLink href={ROUTES.ROOT}>
        <NextImage
          src={
            'https://images.unsplash.com/photo-1677612968800-4d9f1104d251?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
          }
          alt={'forest'}
          width={50}
          height={50}
        />
      </NextLink>
      <NextLink href={ROUTES.ADVERTISER.ACTIVITY.LIST}>Activities</NextLink>
      {user?.roles !== undefined && user.roles.length > 0 ? (
        <>
          {user.roles === ROLES.TRAVELER ? (
            <NextLink href={ROUTES.TRAVELER.DASHBOARD}>
              Traveler dashboard
            </NextLink>
          ) : null}
          {user.roles === ROLES.ADVERTISER ? (
            <NextLink href={ROUTES.ADVERTISER.DASHBOARD}>
              Advertiser dashboard
            </NextLink>
          ) : null}
        </>
      ) : null}
      {user.name === undefined ? (
        <NextLink href={ROUTES.AUTH.SIGNIN}>
          <WebButton label={'Connexion'} />
        </NextLink>
      ) : null}
    </nav>
  )
}
