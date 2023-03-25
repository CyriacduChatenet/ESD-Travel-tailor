import { NextPage } from 'next';
import { WebResetPasswordForm } from '@travel-tailor/ui';

import { Layout } from '@/layout';

const ResetPasswordPage: NextPage = () => (
  <Layout>
    <h1>Reset password</h1>
    <br />
    <WebResetPasswordForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
  </Layout>
);

export default ResetPasswordPage;
