import { useFetch } from '@travel-tailor/hooks';
import { CreateTravelDTO, Travel, UpdateTravelDTO } from '@travel-tailor/types';
import { API_TRAVEL_ROUTE } from '@travel-tailor/constants';

import { TokenService } from './token.service';

const findAllTravels = async (api_url: string): Promise<Travel[]> => {
  const data = await useFetch.get(`${api_url}${API_TRAVEL_ROUTE}`);
  return data.data
};

const findTravelById = async (api_url: string | undefined, travelId: string): Promise<Travel> => {
  return await useFetch.get(`${api_url}${API_TRAVEL_ROUTE}/${travelId}`);
};

const createTravel = async (api_url: string, credentials: CreateTravelDTO): Promise<Travel> => {
  return await useFetch.protectedPost(`${api_url}${API_TRAVEL_ROUTE}`, credentials, `${TokenService.getAccessToken()}`)
};

const updateTravel = async (api_url: string, travelId: string, credentials: UpdateTravelDTO): Promise<Travel> => {
  return await useFetch.protectedPatch(
    `${api_url}${API_TRAVEL_ROUTE}/${travelId}`,
    credentials,
    `${TokenService.getAccessToken() ? TokenService.getAccessToken() : TokenService.getSigninToken()}`
  )
};

const deleteTravel = async (api_url: string, travelId: string) => {
  return await useFetch.protectedRemove(
    `${api_url}${API_TRAVEL_ROUTE}/${travelId}`,
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
