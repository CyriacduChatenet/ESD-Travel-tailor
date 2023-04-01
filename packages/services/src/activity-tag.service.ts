import { API_ACTIVITY_TAG_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { ActivityTag, CreateActivityTagDTO, UpdateActivityTagDTO } from "@travel-tailor/types";

import { TokenService } from "./token.service";

const findAllActivityTags = async (api_url: string, query: string): Promise<ActivityTag[]> => {
    const data = await useFetch.get(`${api_url}${API_ACTIVITY_TAG_ROUTE}${query}`)
    return data.data
};

const findActivityTagById = async (api_url: string, id: string): Promise<ActivityTag> => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_TAG_ROUTE}/${id}`)
};

const createActivityTag = async (api_url: string, credentials: CreateActivityTagDTO): Promise<ActivityTag> => {
    return await useFetch.protectedPost(`${api_url}${API_ACTIVITY_TAG_ROUTE}`, credentials, `${TokenService.getAccessToken()}`);
};

const updateActivityTag = async (api_url: string, id: string, credentials: UpdateActivityTagDTO): Promise<ActivityTag> => {
    return await useFetch.protectedPatch(`${api_url}${API_ACTIVITY_TAG_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`);
};

const deleteActivityTag = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}${API_ACTIVITY_TAG_ROUTE}/${id}`, `${TokenService.getAccessToken()}`);
};

export const ActivityTagService = {
    findAllActivityTags,
    findActivityTagById,
    createActivityTag,
    updateActivityTag,
    deleteActivityTag
};