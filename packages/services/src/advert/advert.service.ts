import { useFetch } from "@travel-tailor/hooks";
import { CreateAdvertDTO, UpdateAdvertDTO } from "@travel-tailor/types";
import { AdvertiserService } from "../advertiser/advertiser.service";

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

const createAdvertLinkWithAdvertiser = async (api_url: string, credentials: CreateAdvertDTO, advertiserId: string) => {
    const advert = createAdvert(`${api_url}/advert`, credentials, advertiserId) as any;
    const advertiser = AdvertiserService.findAdvertiserById(`${api_url}/advertiser`, advertiserId) as any;
    return await AdvertiserService.updateAdvertiser(
        `${api_url}/advertiser`, advertiserId, { ...advertiser, adverts: [...advertiser.adverts, advert.id] }, String(TokenService.getAccessToken()));
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
    createAdvertLinkWithAdvertiser,
    updateAdvert,
    deleteAdvert,
};