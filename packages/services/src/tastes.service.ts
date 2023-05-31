import { API_TASTE_ROUTE } from '@travel-tailor/constants'
import { useFetch } from '@travel-tailor/hooks'
import { CreateTasteDTO, Taste, UpdateTasteDTO } from '@travel-tailor/types'

import { TokenService } from './token.service'
import { Dispatch, SetStateAction } from '@travel-tailor/functions'

const findAllTastes = async (api_url: string, setError: Dispatch<SetStateAction<any>> | any): Promise<Taste[]> => {
  const data = await useFetch.get(`${api_url}${API_TASTE_ROUTE}`, setError)
  return data.data
}

const findOneTaste = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>> | any): Promise<Taste> => {
  return await useFetch.get(`${api_url}${API_TASTE_ROUTE}/${id}`, setError)
}

const createTaste = async (api_url: string, credentials: CreateTasteDTO, setError: Dispatch<SetStateAction<any>> | any): Promise<Taste> => {
  return await useFetch.protectedPost(
    `${api_url}${API_TASTE_ROUTE}`,
    credentials,
    `${
      TokenService.getSigninToken()
    }`,
    setError
  )
}

const createTasteWithRelation = async (api_url: string, tastes: Taste[], travelerId: string, setError: Dispatch<SetStateAction<any>> | any) => {
  tastes.map(async (t) => {
    const taste = await createTaste(api_url, {name: String(t.name), traveler: travelerId}, setError);
    return taste;
  });
};

const updateTaste = async (
  api_url: string,
  id: string,
  credentials: UpdateTasteDTO,
  setError: Dispatch<SetStateAction<any>> | any
): Promise<Taste> => {
  return await useFetch.protectedPatch(
    `${api_url}/taste/${id}`,
    credentials,
    String(TokenService.getAccessToken()),
    setError
  )
}

const deleteTaste = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>> | any) => {
  return await useFetch.protectedRemove(
    `${api_url}/taste/${id}`,
    String(TokenService.getAccessToken()),
    setError
  )
}

export const TasteService = {
  findAllTastes,
  findOneTaste,
  createTaste,
  createTasteWithRelation,
  updateTaste,
  deleteTaste,
}
