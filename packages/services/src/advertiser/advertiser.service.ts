import { useFetch } from '@travel-tailor/hooks'
import { CreateAdvertiserDTO, UpdateAdvertiserDTO } from '@travel-tailor/types'

const createAdvertiser = (
  api_url: string,
  credentials: CreateAdvertiserDTO
) => {
  return useFetch.post(api_url, credentials)
}

const getAdvertiserInfo = async (api_url: string, advertiserId: string) => {
  return await useFetch.get(`${api_url}/advertiser/${advertiserId}`);
};

const updateAdvertiser = async (api_url: string, id: string, credentials: UpdateAdvertiserDTO, token: string) => {
  return await useFetch.protectedPatch(`${api_url}/advertiser/${id}`, credentials, token);
}

export const AdvertiserService = {
  createAdvertiser,
  getAdvertiserInfo,
  updateAdvertiser,
}
