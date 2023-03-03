import { API_TASTE_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { CreateTasteDTO, UpdateTasteDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const createTaste = (credentials: CreateTasteDTO) => {
    return useFetch.protectedPost(API_TASTE_ROUTE, credentials, String(TokenService.getAccessToken()));
};

const updateTaste = (id: string, credentials: UpdateTasteDTO) => {
    return useFetch.protectedPatch(`${API_TASTE_ROUTE}/${id}`, credentials, String(TokenService.getAccessToken()));
};

export const TasteService = {
    createTaste,
    updateTaste,
};