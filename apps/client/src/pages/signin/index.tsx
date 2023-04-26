import { NextPage } from 'next'
import Link from 'next/link'
import { WebGoogleAuthButton, WebSigninForm } from '@travel-tailor/ui'
import { ROUTES } from '@travel-tailor/constants'

import { Layout } from '@/layout'

import styles from './style.module.scss'

const SigninPage: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Signin</h1>
        <br />
        <div>
          <WebGoogleAuthButton api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
        </div>
        <br />
        <WebSigninForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
        <Link href={ROUTES.AUTH.SIGNUP}>Signup</Link>
        <br />
        <Link href={ROUTES.AUTH.FORGOT_PASSWORD}>Forgot password</Link>
      </div>
    </Layout>
  )
}

export default SigninPage
