import { NextPage } from 'next';
import Link from 'next/link';

import { Layout } from '@/layout';
import { WebSignupForm } from '@travel-tailor/ui';

const SignupPage: NextPage = () => {
  return (
    <Layout>
      <h1>Signup</h1>
      <br />
      <WebSignupForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
      <Link href={'/signin'}>Signin</Link>
    </Layout>
  );
};

export default SignupPage;
