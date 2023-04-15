import { API_ACTIVITY_IMAGE_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { ActivityImage, CreateActivityImageDTO, UpdateActivityImageDTO } from "@travel-tailor/types";

import { TokenService } from "./token.service";
import { Dispatch, SetStateAction } from "@travel-tailor/functions";

const findAllActivityImages = async (api_url: string, setError: Dispatch<SetStateAction<any>>): Promise<ActivityImage[]> => {
    const data = await useFetch.get(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}`, setError)
    return data.data
};

const findActivityImageById = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>): Promise<ActivityImage>  => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}/${id}`, setError)
};

const createActivityImage = async (api_url: string, credentials: CreateActivityImageDTO, setError: Dispatch<SetStateAction<any>>): Promise<ActivityImage>  => {
    return await useFetch.post(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}`, credentials, setError);
};

const updateActivityImage = async (api_url: string, id: string, credentials: UpdateActivityImageDTO, setError: Dispatch<SetStateAction<any>>): Promise<ActivityImage>  => {
    return await useFetch.protectedPatch(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`, setError);
};

const deleteActivityImage = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>) => {
    return await useFetch.protectedRemove(`${api_url}${API_ACTIVITY_IMAGE_ROUTE}/${id}`, `${TokenService.getAccessToken()}`, setError);
};

export const ActivityImageService = {
    findAllActivityImages,
    findActivityImageById,
    createActivityImage,
    updateActivityImage,
    deleteActivityImage
};