import { useFetch } from '@travel-tailor/hooks';
import { API_TIMESLOT_ROUTE } from '@travel-tailor/constants';

const findOneTimeSlotById = async (api_url: string, id: string) => {
    const response = await useFetch.get(`${api_url}${API_TIMESLOT_ROUTE}/${id}`);
    return response;
};

export const TimeSlotService = {
    findOneTimeSlotById,
};