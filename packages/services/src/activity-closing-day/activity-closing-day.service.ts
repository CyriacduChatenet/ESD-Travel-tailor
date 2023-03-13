import { useFetch } from "@travel-tailor/hooks";
import { CreateActivityClosingDayDTO, UpdateActivityClosingDayDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const findAllActivityClosingDays = async (api_url: string) => {
    return await useFetch.get(`${api_url}/activity-closing-day`)
};

const findActivityClosingDayById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}/activity-closing-day/${id}`)
};

const createActivityClosingDay = async (api_url: string, credentials: any) => {
    return await useFetch.post(`${api_url}/activity-closing-day`, credentials);
};

const updateActivityClosingDay = async (api_url: string, id: string, credentials: UpdateActivityClosingDayDTO) => {
    return await useFetch.protectedPatch(`${api_url}/activity-closing-day/${id}`, credentials, `${TokenService.getAccessToken()}`);
};

const deleteActivityClosingDay = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}/activity-closing-day/${id}`, `${TokenService.getAccessToken()}`);
};

export const ActivityClosingDayService = {
    findAllActivityClosingDays,
    findActivityClosingDayById,
    createActivityClosingDay,
    updateActivityClosingDay,
    deleteActivityClosingDay
};