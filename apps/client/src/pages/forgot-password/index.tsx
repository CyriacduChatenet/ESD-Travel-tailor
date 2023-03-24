import { NextPage } from 'next';

import { Layout } from '@/layout';
import Link from 'next/link';
import { WebForgotPasswordForm } from '@travel-tailor/ui';
import { ROUTES } from '@travel-tailor/constants';

const ForgotPasswordPage: NextPage = () => (
  <Layout>
    <h1>Forgot password</h1>
    <br />
    <WebForgotPasswordForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
    <Link href={ROUTES.AUTH.SIGNIN}>Signin</Link>
  </Layout>
);

export default ForgotPasswordPage;
