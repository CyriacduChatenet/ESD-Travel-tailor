import { useFetch } from '@travel-tailor/hooks';
import { TokenService } from './token.service';

const updatePlanningActivity = async (api_url: string, travel_id: string, day_id: string, time_slot_id: string, new_activity_id: string) => {
    return await useFetch.protectedPatch(`${api_url}/planning/activity/${travel_id}`, {day_id, time_slot_id, new_activity_id}, `${TokenService.getAccessToken()}`, {})
};

export const PlanningService = {
    updatePlanningActivity,
};