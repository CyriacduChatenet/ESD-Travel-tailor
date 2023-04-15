import { API_ADVERTISER_ROUTE } from '@travel-tailor/constants';
import { Dispatch, SetStateAction } from '@travel-tailor/functions';
import { useFetch } from '@travel-tailor/hooks';
import { Advertiser, CreateAdvertiserDTO, UpdateAdvertiserDTO } from '@travel-tailor/types';

const findAllAdvertiser = async (api_url: string, setError: Dispatch<SetStateAction<any>>): Promise<Advertiser[]> => {
 const data = await useFetch.get(`${api_url}${API_ADVERTISER_ROUTE}`, setError);
  return data.data
};

const findAdvertiserById = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>): Promise<Advertiser> => {
  return await useFetch.get(`${api_url}${API_ADVERTISER_ROUTE}/${id}`, setError);
};

const createAdvertiser = (api_url: string, credentials: CreateAdvertiserDTO, setError: Dispatch<SetStateAction<any>>): Promise<Advertiser> => {
  return useFetch.post(`${api_url}${API_ADVERTISER_ROUTE}`, credentials, setError)
};

const updateAdvertiser = async (api_url: string, id: string, credentials: UpdateAdvertiserDTO, token: string, setError: Dispatch<SetStateAction<any>>): Promise<Advertiser> => {
  return await useFetch.protectedPatch(`${api_url}${API_ADVERTISER_ROUTE}/${id}`, credentials, token, setError);
};

const deleteAdvertiser = async (api_url: string, id: string, token: string, setError: Dispatch<SetStateAction<any>>) => {
  return await useFetch.protectedRemove(`${api_url}${API_ADVERTISER_ROUTE}/${id}`, token, setError);
};

export const AdvertiserService = {
  findAllAdvertiser,
  findAdvertiserById,
  createAdvertiser,
  updateAdvertiser,
  deleteAdvertiser,
}
