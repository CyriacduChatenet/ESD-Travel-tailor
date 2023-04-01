import { API_ADVERTISER_ROUTE } from '@travel-tailor/constants';
import { useFetch } from '@travel-tailor/hooks';
import { Advertiser, CreateAdvertiserDTO, UpdateAdvertiserDTO } from '@travel-tailor/types';

const findAllAdvertiser = async (api_url: string): Promise<Advertiser[]> => {
 const data = await useFetch.get(`${api_url}${API_ADVERTISER_ROUTE}`);
  return data.data
};

const findAdvertiserById = async (api_url: string, id: string): Promise<Advertiser> => {
  return await useFetch.get(`${api_url}${API_ADVERTISER_ROUTE}/${id}`);
};

const createAdvertiser = (api_url: string, credentials: CreateAdvertiserDTO): Promise<Advertiser> => {
  return useFetch.post(`${api_url}${API_ADVERTISER_ROUTE}`, credentials)
};

const updateAdvertiser = async (api_url: string, id: string, credentials: UpdateAdvertiserDTO, token: string): Promise<Advertiser> => {
  return await useFetch.protectedPatch(`${api_url}${API_ADVERTISER_ROUTE}/${id}`, credentials, token);
};

const deleteAdvertiser = async (api_url: string, id: string, token: string) => {
  return await useFetch.protectedRemove(`${api_url}${API_ADVERTISER_ROUTE}/${id}`, token);
};

export const AdvertiserService = {
  findAllAdvertiser,
  findAdvertiserById,
  createAdvertiser,
  updateAdvertiser,
  deleteAdvertiser,
}
