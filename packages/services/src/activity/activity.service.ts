import { useFetch } from "@travel-tailor/hooks";
import { CreateActivityDTO, UpdateActivityDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const findAllActivities = async (api_url: string) => {
    return await useFetch.get(`${api_url}/activity`)
};

const findActivityById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}/activity/${id}`)
};

const createActivity = async (api_url: string, credentials: CreateActivityDTO) => {
    return await useFetch.post(`${api_url}/activity`, credentials);
};

const updateActivity = async (api_url: string, id: string, credentials: UpdateActivityDTO) => {
    return await useFetch.protectedPatch(`${api_url}/activity/${id}`, credentials, `${TokenService.getAccessToken()}`);
};

const deleteActivity = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}/activity/${id}`, `${TokenService.getAccessToken()}`);
};

export const ActivityService = {
    findAllActivities,
    findActivityById,
    createActivity,
    updateActivity,
    deleteActivity
};