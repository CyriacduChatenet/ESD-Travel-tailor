import { NextPage } from 'next'
import { WebResetPasswordForm } from '@travel-tailor/ui'

import { Layout } from '@/layout'

import styles from './style.module.scss'

const ResetPasswordPage: NextPage = () => (
  <Layout>
    <div className={styles.container}>
      <h1>Reset password</h1>
      <br />
      <WebResetPasswordForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
    </div>
  </Layout>
)

export default ResetPasswordPage
