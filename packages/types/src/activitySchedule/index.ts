import { ActivityDetail } from "../activityDetail";

export type ActivitySchedule = {
    id: string;
    opening_at: string;
    closing_at: string;
    activityDetail?: ActivityDetail;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type CreateActivityScheduleDTO = {
    opening_at: string;
    closing_at: string;
    activityDetail?: ActivityDetail;
}

export type UpdateActivityScheduleDTO = {
    opening_at: string;
    closing_at: string;
    activityDetail?: ActivityDetail;
}