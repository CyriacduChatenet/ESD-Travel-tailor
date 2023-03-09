import { useFetch } from "@travel-tailor/hooks";
import { CreateActivityScheduleDTO, UpdateActivityScheduleDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const findAllActivitySchedules = async (api_url: string) => {
    return await useFetch.get(`${api_url}/activity-schedule`)
};

const findActivityScheduleById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}/activity-schedule/${id}`)
};

const createActivitySchedule = async (api_url: string, credentials: CreateActivityScheduleDTO) => {
    return await useFetch.post(`${api_url}/activity-schedule`, credentials);
};

const updateActivitySchedule = async (api_url: string, id: string, credentials: UpdateActivityScheduleDTO) => {
    return await useFetch.protectedPatch(`${api_url}/activity-schedule/${id}`, credentials, `${TokenService.getAccessToken()}`);
};

const deleteActivitySchedule = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}/activity-schedule/${id}`, `${TokenService.getAccessToken()}`);
};

export const ActivityScheduleService = {
    findAllActivitySchedules,
    findActivityScheduleById,
    createActivitySchedule,
    updateActivitySchedule,
    deleteActivitySchedule
};