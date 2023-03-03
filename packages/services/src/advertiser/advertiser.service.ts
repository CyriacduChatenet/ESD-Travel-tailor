import { API_ADVERTISER_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { CreateAdvertiserDTO } from "@travel-tailor/types";

const createAdvertiser = (credentials: CreateAdvertiserDTO) => {
    return useFetch.post(API_ADVERTISER_ROUTE, credentials)
};

export const AdvertiserService = {
    createAdvertiser,
};