import { API_ACTIVITY_SCHEDULE_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { CreateActivityScheduleDTO, UpdateActivityScheduleDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const findAllActivitySchedules = async (api_url: string) => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_SCHEDULE_ROUTE}`)
};

const findActivityScheduleById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_SCHEDULE_ROUTE}/${id}`)
};

const createActivitySchedule = async (api_url: string, credentials: CreateActivityScheduleDTO) => {
    return await useFetch.post(`${api_url}${API_ACTIVITY_SCHEDULE_ROUTE}`, credentials);
};

const updateActivitySchedule = async (api_url: string, id: string, credentials: UpdateActivityScheduleDTO) => {
    return await useFetch.protectedPatch(`${api_url}${API_ACTIVITY_SCHEDULE_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`);
};

const deleteActivitySchedule = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}${API_ACTIVITY_SCHEDULE_ROUTE}/${id}`, `${TokenService.getAccessToken()}`);
};

export const ActivityScheduleService = {
    findAllActivitySchedules,
    findActivityScheduleById,
    createActivitySchedule,
    updateActivitySchedule,
    deleteActivitySchedule
};