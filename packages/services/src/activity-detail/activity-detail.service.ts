import { useFetch } from "@travel-tailor/hooks";
import { CreateActivityDetailDTO, UpdateActivityDetailDTO } from "@travel-tailor/types";

import { TokenService } from "../tokens/token.service";

const findAllActivityDetails = async (api_url: string) => {
    return await useFetch.get(`${api_url}/activity-detail`)
};

const findActivityDetailById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}/activity-detail/${id}`)
};

const createActivityDetail = async (api_url: string, credentials: CreateActivityDetailDTO) => {
    return await useFetch.post(`${api_url}/activity-detail`, credentials);
};

const updateActivityDetail = async (api_url: string, id: string, credentials: UpdateActivityDetailDTO) => {
    return await useFetch.protectedPatch(`${api_url}/activity-detail/${id}`, credentials, `${TokenService.getAccessToken()}`);
};

const deleteActivityDetail = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}/activity-detail/${id}`, `${TokenService.getAccessToken()}`);
};

export const ActivityDetailService = {
    findAllActivityDetails,
    findActivityDetailById,
    createActivityDetail,
    updateActivityDetail,
    deleteActivityDetail
};