import { WebCreateTasteForm } from '@travel-tailor/ui';
import { NextPage } from 'next';

const CreateTastePage: NextPage = () => (
  <div>
    <h1> Create Taste</h1>
    <WebCreateTasteForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} />
  </div>
);

export default CreateTastePage;
