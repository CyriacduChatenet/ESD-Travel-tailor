import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { UserService } from '@travel-tailor/services';

import { Layout } from '@/layout';

const TravelerDashboard: NextPage = () => {
  const [data, setData] = useState<any>({});
  const getData = async () => {
    const response = await UserService.getUserInfo(`${process.env.NEXT_PUBLIC_API_URL}`);
    setData(response);
  }

  useEffect(() => {
    getData();
  }, []);
   return (
    <Layout>
      <h1>Traveler Dashboard</h1>
      <br />
      <h2>Travels</h2>
    </Layout>
  );
}

export default TravelerDashboard;