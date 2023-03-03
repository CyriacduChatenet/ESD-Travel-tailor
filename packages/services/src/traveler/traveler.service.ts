import { API_TRAVELER_ROUTE } from "@travel-tailor/constants";
import { useFetch } from "@travel-tailor/hooks";
import { CreateTravelerDTO } from "@travel-tailor/types";

const createTraveler = (credentials: CreateTravelerDTO) => {
    return useFetch.post(API_TRAVELER_ROUTE, credentials)
};

export const TravelerService = {
    createTraveler,
};