import { useFetch } from '@travel-tailor/hooks';
import { CreateTravelerDTO, Traveler, UpdateTravelerDTO } from '@travel-tailor/types';
import { API_TRAVELER_ROUTE } from '@travel-tailor/constants';

import { TokenService } from './token.service';
import { Dispatch, SetStateAction } from '@travel-tailor/functions';

const findAllTravelers = async (api_url: string, setError: Dispatch<SetStateAction<any>>): Promise<Traveler[]> => {
  const data = await useFetch.get(`${api_url}${API_TRAVELER_ROUTE}`, setError);
  return data.data;
};

const findTravelerById = async (api_url: string, travelerId: string, setError: Dispatch<SetStateAction<any>>): Promise<Traveler> => {
  return await useFetch.get(`${api_url}${API_TRAVELER_ROUTE}/${travelerId}`, setError);
};

const createTraveler = async (api_url: string, credentials: CreateTravelerDTO, setError: Dispatch<SetStateAction<any>>): Promise<Traveler> => {
  return await useFetch.post(`${api_url}${API_TRAVELER_ROUTE}`, credentials, setError)
};

const updateTraveler = async (api_url: string, travelerId: string, credentials: UpdateTravelerDTO, setError: Dispatch<SetStateAction<any>>): Promise<Traveler> => {
  return await useFetch.protectedPatch(
    `${api_url}${API_TRAVELER_ROUTE}/${travelerId}`,
    credentials,
    `${TokenService.getSigninToken() ? TokenService.getSigninToken() : TokenService.getAccessToken()}`,
    setError
  )
};

const deleteTraveler = async (api_url: string, travelerId: string, setError: Dispatch<SetStateAction<any>>) => {
  return await useFetch.protectedRemove(
    `${api_url}${API_TRAVELER_ROUTE}/${travelerId}`,
    String(TokenService.getAccessToken()),
    setError
  )
};

export const TravelerService = {
  findAllTravelers,
  findTravelerById,
  createTraveler,
  updateTraveler,
  deleteTraveler
}
