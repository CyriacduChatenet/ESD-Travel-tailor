import { ROLES, ROUTES } from '@travel-tailor/constants'
import { useUser } from '@travel-tailor/contexts'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { WebButton } from '../../../atoms/button/react'

import styles from './style.module.scss'

export const WebNavbar: FC = () => {
  const { user } = useUser()
  return (
    <nav className={styles.navbar}>
      <Link href={ROUTES.ROOT}>
        <Image
          src={
            'https://images.unsplash.com/photo-1677612968800-4d9f1104d251?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
          }
          alt={'forest'}
          width={50}
          height={50}
        />
      </Link>
      <Link href={ROUTES.ADVERTISER.ACTIVITY.LIST}>Activities</Link>
      {user.roles.length > 0 ? (
        <>
        {user.roles.includes(ROLES.TRAVELER) ? <Link href={ROUTES.TRAVELER.DASHBOARD}>Traveler dashboard</Link> : null}
        {user.roles.includes(ROLES.ADVERTISER) ? <Link href={ROUTES.ADVERTISER.DASHBOARD}>Advertiser dashboard</Link> : null}
        </>
      ) : null}
      <Link href={ROUTES.AUTH.SIGNIN}>
        <WebButton label={'Connexion'} />
      </Link>
    </nav>
  )
}
