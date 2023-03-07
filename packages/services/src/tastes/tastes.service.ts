import { useFetch } from '@travel-tailor/hooks'
import { CreateTasteDTO, UpdateTasteDTO } from '@travel-tailor/types'

import { TokenService } from '../tokens/token.service'

const createTaste = (api_url: string, credentials: CreateTasteDTO) => {
  return useFetch.protectedPost(
    api_url,
    credentials,
    String(TokenService.getAccessToken())
  )
}

const updateTaste = (api_url: string, credentials: UpdateTasteDTO) => {
  return useFetch.protectedPatch(
    `${api_url}`,
    credentials,
    String(TokenService.getAccessToken())
  )
}

export const TasteService = {
  createTaste,
  updateTaste,
}
