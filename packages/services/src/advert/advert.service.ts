import { useFetch } from "@travel-tailor/hooks";
import { CreateAdvertDTO } from "@travel-tailor/types";

import { AdvertiserService } from "../advertiser/advertiser.service";

const findAllAdverts = async (api_url: string) => {
    return await useFetch.get(`${api_url}/advert`);
};

const findAdvertById = async (api_url: string) => {};

const createAdvert = async (api_url: string, credentials: CreateAdvertDTO, advertiserId?: string) => {
    return await useFetch.post(`${api_url}/advert`, {...credentials, advertiserId: advertiserId});
};

const updateAdvert = async (api_url: string) => {};

const deleteAdvert = async (api_url: string) => {};

export const AdvertService = {
    findAllAdverts,
    findAdvertById,
    createAdvert,
    updateAdvert,
    deleteAdvert,
};