import { useFetch } from '@travel-tailor/hooks'
import { CreateTasteDTO, UpdateTasteDTO } from '@travel-tailor/types'

import { TokenService } from '../tokens/token.service'
import { TravelerService } from '../traveler/traveler.service'

const findAllTastes = async (api_url: string) => {
  return await useFetch.get(`${api_url}/taste`)
}

const findOneTaste = async (api_url: string, id: string) => {
  return await useFetch.get(`${api_url}/taste/${id}`)
}

const createTaste = async (api_url: string, credentials: CreateTasteDTO) => {
  return await useFetch.protectedPost(
    `${api_url}/taste`,
    credentials,
    `${
      TokenService.getAccessToken()
        ? TokenService.getAccessToken()
        : TokenService.getSigninToken()
    }`
  )
}

const createTasteWithRelation = async (api_url: string, tastes: {name: string, traveler: string}[], travelerId: string) => {
  const traveler = await TravelerService.findTravelerById(api_url, travelerId);
  tastes.map(async (t) => {
    const taste = await TasteService.createTaste(api_url, {name: t.name, traveler: traveler.id});
    TravelerService.updateTraveler(api_url, travelerId, {tastes: [taste.id]});
  });
};

const updateTaste = async (
  api_url: string,
  id: string,
  credentials: UpdateTasteDTO
) => {
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
