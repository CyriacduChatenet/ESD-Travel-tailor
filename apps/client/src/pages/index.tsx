import { WebCreateTravelForm } from '@travel-tailor/ui';
import { NextPage } from 'next';

import { Layout } from '@/layout';
import { useUser } from '@travel-tailor/contexts';
import { ROLES } from '@travel-tailor/constants';


const Home: NextPage = () => {
  const { user } = useUser();
  return (
    <Layout>
      <>
      <h1>Travel tailor app</h1>
        <br />
        { user.roles.includes(ROLES.TRAVELER) ? <WebCreateTravelForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}/> : null}
      </>
    </Layout>
  );
};

export default Home;
