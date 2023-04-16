import { HelloService } from '@travel-tailor/services';
import { WebCreateTravelForm } from '@travel-tailor/ui';
import { NextPage } from 'next';

import { Layout } from '@/layout';
import { useUser } from '@travel-tailor/contexts';
import { ROLES } from '@travel-tailor/constants';
import { useState } from 'react';

interface IProps {
  message: string;
}

const Home: NextPage<IProps> = ({ message }) => {
  const { user } = useUser();
  return (
    <Layout>
      <>
        <p>{message}</p>
        <br />
        { user.roles.includes(ROLES.TRAVELER) ? <WebCreateTravelForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}/> : null}
      </>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const error = {};
  const response = await HelloService.getHello(
    `${process.env.NEXT_PUBLIC_API_URL}`,
  );
  return {
    props: {
      message: response.message,
      error
    },
  };
};
