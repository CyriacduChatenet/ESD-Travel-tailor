import { useFetch } from '@travel-tailor/hooks';
import { CreateTravelerDTO, UpdateTravelerDTO } from '@travel-tailor/types';

import { TokenService } from '../tokens/token.service';

const findAllTravelers = async (api_url: string) => {
  return await useFetch.get(`${api_url}/traveler`);
};

const findTravelerById = async (api_url: string, travelerId: string) => {
  return await useFetch.get(`${api_url}/traveler/${travelerId}`);
};

const createTraveler = async (api_url: string, credentials: CreateTravelerDTO) => {
  return await useFetch.post(`${api_url}/traveler`, credentials)
};

const updateTraveler = async (api_url: string, travelerId: string, credentials: UpdateTravelerDTO) => {
  return await useFetch.protectedPatch(
    `${api_url}/traveler/${travelerId}`,
    credentials,
    String(TokenService.getAccessToken())
  )
};

const deleteTraveler = async (api_url: string, travelerId: string) => {
  return await useFetch.protectedRemove(
    `${api_url}/traveler/${travelerId}`,
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
