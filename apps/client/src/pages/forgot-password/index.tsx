import { NextPage } from 'next'
import Link from 'next/link'
import { WebForgotPasswordForm } from '@travel-tailor/ui'
import { ROUTES } from '@travel-tailor/constants'

import { Layout } from '@/layout'

import styles from './style.module.scss'

const ForgotPasswordPage: NextPage = () => (
  <Layout>
    <div className={styles.container}>
      <h1>Forgot password</h1>
      <br />
      <WebForgotPasswordForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
      <Link href={ROUTES.AUTH.SIGNIN}>Signin</Link>
    </div>
  </Layout>
)

export default ForgotPasswordPage
