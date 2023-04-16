import { API_ACTIVITY_SCHEDULE_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { ActivitySchedule, CreateActivityScheduleDTO, UpdateActivityScheduleDTO } from "@travel-tailor/types";

import { TokenService } from "./token.service";
import { Dispatch, SetStateAction } from "@travel-tailor/functions";

const findAllActivitySchedules = async (api_url: string, setError: Dispatch<SetStateAction<any>> | any): Promise<ActivitySchedule[]> => {
    const data = await useFetch.get(`${api_url}${API_ACTIVITY_SCHEDULE_ROUTE}`, setError)
    return data.data
};

const findActivityScheduleById = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>> | any): Promise<ActivitySchedule> => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_SCHEDULE_ROUTE}/${id}`, setError)
};

const createActivitySchedule = async (api_url: string, credentials: CreateActivityScheduleDTO, setError: Dispatch<SetStateAction<any>> | any): Promise<ActivitySchedule> => {
    return await useFetch.post(`${api_url}${API_ACTIVITY_SCHEDULE_ROUTE}`, credentials, setError);
};

const updateActivitySchedule = async (api_url: string, id: string, credentials: UpdateActivityScheduleDTO, setError: Dispatch<SetStateAction<any>> | any): Promise<ActivitySchedule> => {
    return await useFetch.protectedPatch(`${api_url}${API_ACTIVITY_SCHEDULE_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`, setError);
};

const deleteActivitySchedule = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>> | any) => {
    return await useFetch.protectedRemove(`${api_url}${API_ACTIVITY_SCHEDULE_ROUTE}/${id}`, `${TokenService.getAccessToken()}`, setError);
};

export const ActivityScheduleService = {
    findAllActivitySchedules,
    findActivityScheduleById,
    createActivitySchedule,
    updateActivitySchedule,
    deleteActivitySchedule
};