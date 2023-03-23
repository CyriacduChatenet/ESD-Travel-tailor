import { useFetch } from '@travel-tailor/hooks';
import { CreateTravelDTO, UpdateTravelDTO } from '@travel-tailor/types';

import { TokenService } from '../tokens/token.service';

const findAllTravels = async (api_url: string) => {
  return await useFetch.get(`${api_url}/travel`);
};

const findTravelById = async (api_url: string | undefined, travelId: string) => {
  return await useFetch.get(`${api_url}/travel/${travelId}`);
};

const createTravel = async (api_url: string, credentials: CreateTravelDTO) => {
  return await useFetch.protectedPost(`${api_url}/travel`, credentials, `${TokenService.getAccessToken()}`)
};

const updateTravel = async (api_url: string, travelId: string, credentials: any) => {
  return await useFetch.protectedPatch(
    `${api_url}/travel/${travelId}`,
    credentials,
    `${TokenService.getAccessToken() ? TokenService.getAccessToken() : TokenService.getSigninToken()}`
  )
};

const deleteTravel = async (api_url: string, travelId: string) => {
  return await useFetch.protectedRemove(
    `${api_url}/travel/${travelId}`,
    String(TokenService.getAccessToken())
  )
};

export const TravelService = {
  findAllTravels,
  findTravelById,
  createTravel,
  updateTravel,
  deleteTravel
}
