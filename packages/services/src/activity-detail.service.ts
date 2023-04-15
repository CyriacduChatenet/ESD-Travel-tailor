import { API_ACTIVITY_DETAIL_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { ActivityDetail, CreateActivityDetailDTO, UpdateActivityDetailDTO } from "@travel-tailor/types";

import { TokenService } from "./token.service";
import { Dispatch, SetStateAction } from "@travel-tailor/functions";

const findAllActivityDetails = async (api_url: string, setError: Dispatch<SetStateAction<any>>):Promise<ActivityDetail[]> => {
    const data = await useFetch.get(`${api_url}${API_ACTIVITY_DETAIL_ROUTE}`, setError);
    return data.data
};

const findActivityDetailById = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>): Promise<ActivityDetail> => {
    return await useFetch.get(`${api_url}${API_ACTIVITY_DETAIL_ROUTE}/${id}`, setError)
};

const createActivityDetail = async (api_url: string, credentials: CreateActivityDetailDTO, setError: Dispatch<SetStateAction<any>>): Promise<ActivityDetail> => {
    return await useFetch.post(`${api_url}${API_ACTIVITY_DETAIL_ROUTE}`, credentials, setError);
};

const updateActivityDetail = async (api_url: string, id: string, credentials: UpdateActivityDetailDTO, setError: Dispatch<SetStateAction<any>>): Promise<ActivityDetail> => {
    return await useFetch.protectedPatch(`${api_url}${API_ACTIVITY_DETAIL_ROUTE}/${id}`, credentials, `${TokenService.getAccessToken()}`, setError);
};

const deleteActivityDetail = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>) => {
    return await useFetch.protectedRemove(`${api_url}${API_ACTIVITY_DETAIL_ROUTE}/${id}`, `${TokenService.getAccessToken()}`, setError);
};

export const ActivityDetailService = {
    findAllActivityDetails,
    findActivityDetailById,
    createActivityDetail,
    updateActivityDetail,
    deleteActivityDetail
};