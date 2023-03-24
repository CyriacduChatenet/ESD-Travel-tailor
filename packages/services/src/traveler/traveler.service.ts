import { useFetch } from '@travel-tailor/hooks';
import { CreateTravelerDTO, UpdateTravelerDTO } from '@travel-tailor/types';
import { API_TRAVELER_ROUTE } from '@travel-tailor/constants';

import { TokenService } from '../tokens/token.service';

const findAllTravelers = async (api_url: string) => {
  return await useFetch.get(`${api_url}${API_TRAVELER_ROUTE}`);
};

const findTravelerById = async (api_url: string | undefined, travelerId: string) => {
  return await useFetch.get(`${api_url}${API_TRAVELER_ROUTE}/${travelerId}`);
};

const createTraveler = async (api_url: string, credentials: CreateTravelerDTO) => {
  return await useFetch.post(`${api_url}${API_TRAVELER_ROUTE}`, credentials)
};

const updateTraveler = async (api_url: string, travelerId: string, credentials: UpdateTravelerDTO) => {
  return await useFetch.protectedPatch(
    `${api_url}${API_TRAVELER_ROUTE}/${travelerId}`,
    credentials,
    `${TokenService.getAccessToken() ? TokenService.getAccessToken() : TokenService.getSigninToken()}`
  )
};

const deleteTraveler = async (api_url: string, travelerId: string) => {
  return await useFetch.protectedRemove(
    `${api_url}${API_TRAVELER_ROUTE}/${travelerId}`,
    String(TokenService.getAccessToken())
  )
};

export const TravelerService = {
  findAllTravelers,
  findTravelerById,
  createTraveler,
  updateTraveler,
  deleteTraveler
}
