import { API_ACTIVITY_CLOSING_DAY_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { ActivityClosingDay, CreateActivityClosingDayDTO, UpdateActivityClosingDayDTO } from "@travel-tailor/types";

import { TokenService } from "./token.service";
import { Dispatch, SetStateAction } from "@travel-tailor/functions";

const findAllActivityClosingDays = async (api_url: string, setError: Dispatch<SetStateAction<any>>): Promise<ActivityClosingDay[]> => {
    const data = await useFetch.get(`${api_url}${API_ACTIVITY_CLOSING_DAY_ROUTE}`, setError)
    return data.data;
};

const findActivityClosingDayById = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>): Promise<ActivityClosingDay> => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_CLOSING_DAY_ROUTE}/${id}`, setError)
};

const createActivityClosingDay = async (api_url: string, credentials: CreateActivityClosingDayDTO, setError: Dispatch<SetStateAction<any>>): Promise<ActivityClosingDay> => {
    return await useFetch.post(`${api_url}${API_ACTIVITY_CLOSING_DAY_ROUTE}`, { ...credentials, date: new Date(credentials.date)}, setError);
};

const updateActivityClosingDay = async (api_url: string, id: string, credentials: UpdateActivityClosingDayDTO, setError: Dispatch<SetStateAction<any>>): Promise<ActivityClosingDay> => {
    return await useFetch.protectedPatch(`${api_url}${API_ACTIVITY_CLOSING_DAY_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`, setError);
};

const deleteActivityClosingDay = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>) => {
    return await useFetch.protectedRemove(`${api_url}${API_ACTIVITY_CLOSING_DAY_ROUTE}/${id}`, `${TokenService.getAccessToken()}`, setError);
};

export const ActivityClosingDayService = {
    findAllActivityClosingDays,
    findActivityClosingDayById,
    createActivityClosingDay,
    updateActivityClosingDay,
    deleteActivityClosingDay
};