import { HelloService } from '@travel-tailor/services';
import { NextPage } from 'next';

import { Layout } from '@/layout';

const Home: NextPage = ({ message }: any) => {
	return (
		<Layout>
			<>
				<p>{message}</p>
			</>
		</Layout>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const response = await HelloService.getHello();
	return {
		props: {
			message: response.message,
		},
	};
};
