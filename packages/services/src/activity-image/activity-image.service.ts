import { API_ACTIVITY_IMAGE_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { CreateActivityImageDTO, UpdateActivityImageDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const findAllActivityImages = async (api_url: string) => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}`)
};

const findActivityImageById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}/${id}`)
};

const createActivityImage = async (api_url: string, credentials: CreateActivityImageDTO) => {
    return await useFetch.post(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}`, credentials);
};

const updateActivityImage = async (api_url: string, id: string, credentials: UpdateActivityImageDTO) => {
    return await useFetch.protectedPatch(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`);
};

const deleteActivityImage = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}/${id}`, `${TokenService.getAccessToken()}`);
};

export const ActivityImageService = {
    findAllActivityImages,
    findActivityImageById,
    createActivityImage,
    updateActivityImage,
    deleteActivityImage
};