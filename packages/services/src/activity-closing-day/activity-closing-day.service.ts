import { API_ACTIVITY_CLOSING_DAY_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { CreateActivityClosingDayDTO, UpdateActivityClosingDayDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const findAllActivityClosingDays = async (api_url: string) => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_CLOSING_DAY_ROUTE}`)
};

const findActivityClosingDayById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_CLOSING_DAY_ROUTE}/${id}`)
};

const createActivityClosingDay = async (api_url: string, credentials: CreateActivityClosingDayDTO) => {
    return await useFetch.post(`${api_url}${API_ACTIVITY_CLOSING_DAY_ROUTE}`, credentials);
};

const updateActivityClosingDay = async (api_url: string, id: string, credentials: UpdateActivityClosingDayDTO) => {
    return await useFetch.protectedPatch(`${api_url}${API_ACTIVITY_CLOSING_DAY_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`);
};

const deleteActivityClosingDay = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}${API_ACTIVITY_CLOSING_DAY_ROUTE}/${id}`, `${TokenService.getAccessToken()}`);
};

export const ActivityClosingDayService = {
    findAllActivityClosingDays,
    findActivityClosingDayById,
    createActivityClosingDay,
    updateActivityClosingDay,
    deleteActivityClosingDay
};