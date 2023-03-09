import { useFetch } from "@travel-tailor/hooks";
import { CreateActivityImageDTO, UpdateActivityImageDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const findAllActivityImages = async (api_url: string) => {
    return await useFetch.get(`${api_url}/activity-image`)
};

const findActivityImageById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}/activity-image/${id}`)
};

const createActivityImage = async (api_url: string, credentials: CreateActivityImageDTO) => {
    return await useFetch.post(`${api_url}/activity-image`, credentials);
};

const updateActivityImage = async (api_url: string, id: string, credentials: UpdateActivityImageDTO) => {
    return await useFetch.protectedPatch(`${api_url}/activity-image/${id}`, credentials, `${TokenService.getAccessToken()}`);
};

const deleteActivityImage = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}/activity-image/${id}`, `${TokenService.getAccessToken()}`);
};

export const ActivityImageService = {
    findAllActivityImages,
    findActivityImageById,
    createActivityImage,
    updateActivityImage,
    deleteActivityImage
};