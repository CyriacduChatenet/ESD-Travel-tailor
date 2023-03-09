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
  return await useFetch.post(api_url, credentials)
};

const updateTraveler = async (api_url: string, credentials: UpdateTravelerDTO) => {
  return await useFetch.protectedPatch(
    `${api_url}`,
    credentials,
    String(TokenService.getSigninToken())
  )
};

const deleteTraveler = async (api_url: string, travelerId: string) => {
  return await useFetch.protectedRemove(
    `${api_url}/${travelerId}`,
    String(TokenService.getSigninToken())
  )
};

export const TravelerService = {
  findAllTravelers,
  findTravelerById,
  createTraveler,
  updateTraveler,
  deleteTraveler
}
