import { useFetch } from "@travel-tailor/hooks";
import { CreateAdvertDTO, UpdateAdvertDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const findAllAdverts = async (api_url: string) => {
    return await useFetch.get(`${api_url}/advert`);
};

const findAdvertById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}/advert/${id}`);
};

const createAdvert = async (api_url: string, credentials: CreateAdvertDTO, advertiserId?: string) => {
    return await useFetch.post(`${api_url}/advert`, {...credentials, advertiserId: advertiserId});
};

const updateAdvert = async (api_url: string, id: string, credentials: UpdateAdvertDTO) => {
    return await useFetch.protectedPatch(`${api_url}/advert/${id}`, credentials, String(TokenService.getAccessToken()));
};

const deleteAdvert = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}/advert/${id}`, String(TokenService.getAccessToken()));
};

export const AdvertService = {
    findAllAdverts,
    findAdvertById,
    createAdvert,
    updateAdvert,
    deleteAdvert,
};