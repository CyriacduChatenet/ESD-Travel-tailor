import { NextPage } from 'next';
import Link from 'next/link';
import { WebSignupForm } from '@travel-tailor/ui';
import { ROUTES } from '@travel-tailor/constants';

import { Layout } from '@/layout';

import styles from './style.module.scss';

const SignupPage: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
      <h1>Signup</h1>
      <br />
      <WebSignupForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
      <Link href={ROUTES.AUTH.SIGNIN}>Signin</Link>
      </div>
    </Layout>
  );
};

export default SignupPage;
