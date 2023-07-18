import { useFetch } from '@travel-tailor/hooks';
import { API_PICTURE_ROUTE } from '@travel-tailor/constants';

const findPicture = async (api_url: string, setError: any) => {
    const data = await useFetch.get(`${api_url}${API_PICTURE_ROUTE}`, setError);
    return data;
};

export const PictureService = {
    findPicture,
};