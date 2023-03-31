import { API_TASTE_ROUTE } from '@travel-tailor/constants'
import { useFetch } from '@travel-tailor/hooks'
import { CreateTasteDTO, Taste, UpdateTasteDTO } from '@travel-tailor/types'

import { TokenService } from './token.service'
import { TravelerService } from './traveler.service'

const findAllTastes = async (api_url: string): Promise<Taste[]> => {
  return await useFetch.get(`${api_url}${API_TASTE_ROUTE}`)
}

const findOneTaste = async (api_url: string, id: string): Promise<Taste> => {
  return await useFetch.get(`${api_url}${API_TASTE_ROUTE}/${id}`)
}

const createTaste = async (api_url: string, credentials: CreateTasteDTO): Promise<Taste> => {
  console.log(TokenService.getSigninToken())
  return await useFetch.protectedPost(
    `${api_url}${API_TASTE_ROUTE}`,
    credentials,
    `${
      TokenService.getSigninToken()
    }`
  )
}

const createTasteWithRelation = async (api_url: string, tastes: Taste[], travelerId: string) => {
  const traveler = await TravelerService.findTravelerById(api_url, travelerId);
  tastes.map(async (t) => {
    const taste = await createTaste(api_url, {name: String(t.name), traveler: traveler.id});
    TravelerService.updateTraveler(api_url, travelerId, {tastes: [`${taste.id}`]});
  });
};

const updateTaste = async (
  api_url: string,
  id: string,
  credentials: UpdateTasteDTO
): Promise<Taste> => {
  return await useFetch.protectedPatch(
    `${api_url}/taste/${id}`,
    credentials,
    String(TokenService.getAccessToken())
  )
}

const deleteTaste = async (api_url: string, id: string) => {
  return await useFetch.protectedRemove(
    `${api_url}/taste/${id}`,
    String(TokenService.getAccessToken())
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
