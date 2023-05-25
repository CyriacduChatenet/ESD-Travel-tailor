import { API_ACTIVITY_TAG_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { ActivityTag, CreateActivityTagDTO, UpdateActivityTagDTO } from "@travel-tailor/types";

import { TokenService } from "./token.service";
import { Dispatch, SetStateAction } from "@travel-tailor/functions";

const findAllActivityTags = async (api_url: string, query: string, setError: Dispatch<SetStateAction<any>> | any) => {
    const data = await useFetch.get(`${api_url}${API_ACTIVITY_TAG_ROUTE}${query}`, setError)
    return data;
};

const findActivityTagById = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>> | any): Promise<ActivityTag> => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_TAG_ROUTE}/${id}`, setError)
};

const createActivityTag = async (api_url: string, credentials: CreateActivityTagDTO, setError: Dispatch<SetStateAction<any>> | any): Promise<ActivityTag> => {
    return await useFetch.protectedPost(`${api_url}${API_ACTIVITY_TAG_ROUTE}`, credentials, `${TokenService.getAccessToken()}`, setError);
};

const updateActivityTag = async (api_url: string, id: string, credentials: UpdateActivityTagDTO, setError: Dispatch<SetStateAction<any>> | any): Promise<ActivityTag> => {
    return await useFetch.protectedPatch(`${api_url}${API_ACTIVITY_TAG_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`, setError);
};

const updateActivityTagFormData = async (api_url: string, id: string, credentials: FormData, setError: Dispatch<SetStateAction<any>> | any): Promise<ActivityTag> => {
    return await useFetch.protectedPatchFormData(`${api_url}${API_ACTIVITY_TAG_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`, setError);
};

const deleteActivityTag = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>> | any) => {
    return await useFetch.protectedRemove(`${api_url}${API_ACTIVITY_TAG_ROUTE}/${id}`, `${TokenService.getAccessToken()}`, setError);
};

export const ActivityTagService = {
    findAllActivityTags,
    findActivityTagById,
    createActivityTag,
    updateActivityTag,
    updateActivityTagFormData,
    deleteActivityTag
};