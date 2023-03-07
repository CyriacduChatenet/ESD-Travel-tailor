import { FC, PropsWithChildren } from 'react'

import styles from './style.module.scss'

export const WebNavbar = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.navbar}>
      <>{children}</>
    </div>
  )
}
