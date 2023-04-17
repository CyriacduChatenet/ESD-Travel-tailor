import { NextImage } from '@travel-tailor/functions'
import { FC } from 'react'

import styles from './style.module.scss'

export const WebBanner: FC = () => {
  return (
    <div className={styles.webBanner}>
      <NextImage
        src={
          'https://images.unsplash.com/photo-1601650904409-0ba17f32926a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80'
        }
        alt={''}
        width={1200}
        height={600}
        className={styles.webBannerBackground}
      />
      <p className={styles.webBannerLabel}>Banner</p>
    </div>
  )
}
