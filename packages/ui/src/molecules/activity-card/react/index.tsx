import { Activity } from '@travel-tailor/types';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface IProps {
    data: Activity;
    handleDelete: (id: string) => void;
};

export const WebActivityCard: FC<IProps> = ({ data, handleDelete }) => {
    const router = useRouter();
    const handleRedirect = (id: string) => {
        router.push(`/advertiser/update-activity/${id}`)
    };
  return (
    <div>
      <p>{data.name}</p>
      <p>{data.mark}/10</p>
      <button onClick={() => handleRedirect(data.id)}>Update</button>
      <br />
      <br />
      <button onClick={() => handleDelete(data.id)}>Delete</button>
    </div>
  )
}
