import { API_ACTIVITY_DETAIL_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { ActivityDetail, CreateActivityDetailDTO, UpdateActivityDetailDTO } from "@travel-tailor/types";

import { TokenService } from "./token.service";

const findAllActivityDetails = async (api_url: string):Promise<ActivityDetail[]> => {
    const data = await useFetch.get(`${api_url}${API_ACTIVITY_DETAIL_ROUTE}`);
    return data.data
};

const findActivityDetailById = async (api_url: string, id: string): Promise<ActivityDetail> => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_DETAIL_ROUTE}/${id}`)
};

const createActivityDetail = async (api_url: string, credentials: CreateActivityDetailDTO): Promise<ActivityDetail> => {
    return await useFetch.post(`${api_url}${API_ACTIVITY_DETAIL_ROUTE}`, credentials);
};

const updateActivityDetail = async (api_url: string, id: string, credentials: UpdateActivityDetailDTO): Promise<ActivityDetail> => {
    return await useFetch.protectedPatch(`${api_url}${API_ACTIVITY_DETAIL_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`);
};

const deleteActivityDetail = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}${API_ACTIVITY_DETAIL_ROUTE}/${id}`, `${TokenService.getAccessToken()}`);
};

export const ActivityDetailService = {
    findAllActivityDetails,
    findActivityDetailById,
    createActivityDetail,
    updateActivityDetail,
    deleteActivityDetail
};