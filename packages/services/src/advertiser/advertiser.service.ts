import { useFetch } from '@travel-tailor/hooks'
import { CreateAdvertiserDTO } from '@travel-tailor/types'

const createAdvertiser = (
  api_url: string,
  credentials: CreateAdvertiserDTO
) => {
  return useFetch.post(api_url, credentials)
}

export const AdvertiserService = {
  createAdvertiser,
}
