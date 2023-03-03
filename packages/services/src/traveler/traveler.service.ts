import { API_TRAVELER_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { CreateTravelerDTO, UpdateTravelerDTO } from "@travel-tailor/types";
import { TokenService } from "../tokens/token.service";

const createTraveler = (credentials: CreateTravelerDTO) => {
    return useFetch.post(API_TRAVELER_ROUTE, credentials)
};

const updateTraveler = (id: string, credentials: UpdateTravelerDTO) => {
    return useFetch.protectedPatch(`${API_TRAVELER_ROUTE}/${id}`, credentials, String(TokenService.getSigninToken()))
};

export const TravelerService = {
    createTraveler,
    updateTraveler,
};