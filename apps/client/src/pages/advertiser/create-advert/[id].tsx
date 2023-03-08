import { NextPage } from 'next';

import { Layout } from '@/layout';
import { WebCreateAdvertiserForm } from '@travel-tailor/ui';

const CreateAdvert: NextPage = () => (
  <Layout>
    <h1>Create advert</h1>
    <WebCreateAdvertiserForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
  </Layout>
);

export default CreateAdvert;
