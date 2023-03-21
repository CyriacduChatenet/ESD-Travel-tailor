import { HelloService } from '@travel-tailor/services';
import { WebTravelForm } from '@travel-tailor/ui';
import { NextPage } from 'next';

import { Layout } from '@/layout';
import { useUser } from '@travel-tailor/contexts';
import { ROLES } from '@travel-tailor/constants';

const Home: NextPage = ({ message }: any) => {
  const { user } = useUser();
  return (
    <Layout>
      <>
        <p>{message}</p>
        <br />
        { user.roles.includes(ROLES.TRAVELER) ? <WebTravelForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`}/> : null}
      </>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const response = await HelloService.getHello(
    `${process.env.NEXT_PUBLIC_API_URL}`,
  );
  return {
    props: {
      message: response.message,
    },
  };
};
