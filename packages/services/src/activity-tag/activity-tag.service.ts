import { API_ACTIVITY_TAG_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { CreateActivityTagDTO, UpdateActivityTagDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const findAllActivityTags = async (api_url: string, query: string) => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_TAG_ROUTE}${query}`)
};

const findActivityTagById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_TAG_ROUTE}/${id}`)
};

const createActivityTag = async (api_url: string, credentials: CreateActivityTagDTO) => {
    return await useFetch.protectedPost(`${api_url}${API_ACTIVITY_TAG_ROUTE}`, credentials, `${TokenService.getAccessToken()}`);
};

const updateActivityTag = async (api_url: string, id: string, credentials: UpdateActivityTagDTO) => {
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