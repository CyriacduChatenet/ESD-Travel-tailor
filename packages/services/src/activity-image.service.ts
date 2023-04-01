import { API_ACTIVITY_IMAGE_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { ActivityImage, CreateActivityImageDTO, UpdateActivityImageDTO } from "@travel-tailor/types";

import { TokenService } from "./token.service";

const findAllActivityImages = async (api_url: string): Promise<ActivityImage[]> => {
    const data = await useFetch.get(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}`)
    return data.data
};

const findActivityImageById = async (api_url: string, id: string): Promise<ActivityImage>  => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}/${id}`)
};

const createActivityImage = async (api_url: string, credentials: CreateActivityImageDTO): Promise<ActivityImage>  => {
    return await useFetch.post(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}`, credentials);
};

const updateActivityImage = async (api_url: string, id: string, credentials: UpdateActivityImageDTO): Promise<ActivityImage>  => {
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