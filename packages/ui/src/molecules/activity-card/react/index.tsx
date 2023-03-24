import { ROUTES } from '@travel-tailor/constants';
import { Activity } from '@travel-tailor/types';
import { FC, useRouter } from '@travel-tailor/functions';

interface IProps {
    data: Activity;
    handleDelete: (id: string) => void;
};

export const WebActivityCard: FC<IProps> = ({ data, handleDelete }) => {
    const router = useRouter();
    const handleRedirect = (id: string) => {
        router.push(`${ROUTES.ADVERTISER.ACTIVITY.UPDATE_ACTIVITY}/${id}`)
    };
  return (
    <div>
      <p>{data.name}</p>
      <p>{data.mark}/10</p>
      <button onClick={() => handleRedirect(`${data.id}`)}>Update</button>
      <br />
      <br />
      <button onClick={() => handleDelete(`${data.id}`)}>Delete</button>
    </div>
  )
}
