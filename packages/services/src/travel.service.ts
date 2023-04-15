import { useFetch } from '@travel-tailor/hooks';
import { CreateTravelDTO, Travel, UpdateTravelDTO } from '@travel-tailor/types';
import { API_TRAVEL_ROUTE } from '@travel-tailor/constants';

import { TokenService } from './token.service';
import { Dispatch, SetStateAction } from '@travel-tailor/functions';

const findAllTravels = async (api_url: string, setError: Dispatch<SetStateAction<any>>): Promise<Travel[]> => {
  const data = await useFetch.get(`${api_url}${API_TRAVEL_ROUTE}`, setError);
  return data.data
};

const findTravelById = async (api_url: string | undefined, travelId: string, setError: Dispatch<SetStateAction<any>>): Promise<Travel> => {
  return await useFetch.get(`${api_url}${API_TRAVEL_ROUTE}/${travelId}`, setError);
};

const createTravel = async (api_url: string, credentials: CreateTravelDTO, setError: Dispatch<SetStateAction<any>>): Promise<Travel> => {
  return await useFetch.protectedPost(`${api_url}${API_TRAVEL_ROUTE}`, credentials, `${TokenService.getAccessToken()}`, setError)
};

const updateTravel = async (api_url: string, travelId: string, credentials: UpdateTravelDTO, setError: Dispatch<SetStateAction<any>>): Promise<Travel> => {
  return await useFetch.protectedPatch(
    `${api_url}${API_TRAVEL_ROUTE}/${travelId}`,
    credentials,
    `${TokenService.getAccessToken() ? TokenService.getAccessToken() : TokenService.getSigninToken()}`,
    setError
  )
};

const deleteTravel = async (api_url: string, travelId: string, setError: Dispatch<SetStateAction<any>>) => {
  return await useFetch.protectedRemove(
    `${api_url}${API_TRAVEL_ROUTE}/${travelId}`,
    String(TokenService.getAccessToken()),
    setError
  )
};

export const TravelService = {
  findAllTravels,
  findTravelById,
  createTravel,
  updateTravel,
  deleteTravel
}
