import { useFetch } from '@travel-tailor/hooks'
import { CreateAdvertiserDTO } from '@travel-tailor/types'

const createAdvertiser = (
  api_url: string,
  credentials: CreateAdvertiserDTO
) => {
  return useFetch.post(api_url, credentials)
}

const getAdvertiserInfo = async (api_url: string, advertiserId: string) => {
  return await useFetch.get(`${api_url}/advertiser/${advertiserId}`);
};

export const AdvertiserService = {
  createAdvertiser,
  getAdvertiserInfo,
}
