import { useFetch } from '@travel-tailor/hooks';
import { CreateTasteDTO, UpdateTasteDTO } from '@travel-tailor/types';

import { TokenService } from '../tokens/token.service';

const findAllTastes = async (api_url: string) => {
  return await useFetch.get(`${api_url}/taste`);
};

const findOneTaste = async (api_url: string, id: string) => {
  return await useFetch.get(`${api_url}/taste/${id}`);
};

const createTaste = async (api_url: string, credentials: CreateTasteDTO) => {
  return await useFetch.protectedPost(
    `${api_url}/taste`,
    credentials,
    String(TokenService.getAccessToken())
  )
};

const updateTaste = async (api_url: string, id: string, credentials: UpdateTasteDTO) => {
  return await useFetch.protectedPatch(
    `${api_url}/taste/${id}`,
    credentials,
    String(TokenService.getAccessToken())
  )
};

const deleteTaste = async (api_url: string, id: string) => {
  return await useFetch.protectedRemove(`${api_url}/taste/${id}`, String(TokenService.getAccessToken()));
};

export const TasteService = {
  findAllTastes,
  findOneTaste,
  createTaste,
  updateTaste,
  deleteTaste
}
