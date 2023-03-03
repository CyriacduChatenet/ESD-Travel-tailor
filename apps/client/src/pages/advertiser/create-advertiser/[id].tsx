import { NextPage } from 'next';
import { WebCreateAdvertiserForm } from '@travel-tailor/ui';

import { Layout } from '@/layout';

const CreateAdvertiser: NextPage = () => {
	return (
		<Layout>
			<h1>Create advertiser</h1>
			<WebCreateAdvertiserForm />
		</Layout>
	);
};

export default CreateAdvertiser;
