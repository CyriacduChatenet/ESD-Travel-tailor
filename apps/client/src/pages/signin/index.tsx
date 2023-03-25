import { NextPage } from 'next';
import Link from 'next/link';
import { WebSigninForm } from '@travel-tailor/ui';
import { ROUTES } from '@travel-tailor/constants';

import { Layout } from '@/layout';

const SigninPage: NextPage = () => (
  <Layout>
    <h1>Signin</h1>
    <br />
    <WebSigninForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
    <Link href={ROUTES.AUTH.SIGNUP}>Signup</Link>
    <br />
    <Link href={ROUTES.AUTH.FORGOT_PASSWORD}>Forgot password</Link>
  </Layout>
);

export default SigninPage;
