import { NextPage } from 'next';
import Link from 'next/link';
import { WebSignupForm } from '@travel-tailor/ui';
import { ROUTES } from '@travel-tailor/constants';

import { Layout } from '@/layout';

const SignupPage: NextPage = () => {
  return (
    <Layout>
      <h1>Signup</h1>
      <br />
      <WebSignupForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
      <Link href={ROUTES.AUTH.SIGNIN}>Signin</Link>
    </Layout>
  );
};

export default SignupPage;
