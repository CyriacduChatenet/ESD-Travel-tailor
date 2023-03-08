import { useFetch } from '@travel-tailor/hooks'
import { CreateTravelerDTO, UpdateTravelerDTO } from '@travel-tailor/types'
import { TokenService } from '../tokens/token.service'

const createTraveler = (api_url: string, credentials: CreateTravelerDTO) => {
  return useFetch.post(api_url, credentials)
}

const updateTraveler = (api_url: string, credentials: UpdateTravelerDTO) => {
  return useFetch.protectedPatch(
    `${api_url}`,
    credentials,
    String(TokenService.getSigninToken())
  )
}

const getTravelerInfo = async (api_url: string, travelerId: string) => {
  return await useFetch.get(`${api_url}/traveler/${travelerId}`);
};

export const TravelerService = {
  createTraveler,
  updateTraveler,
  getTravelerInfo,
}
