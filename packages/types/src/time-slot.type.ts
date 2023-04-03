import { Activity } from "./activity.type";
import { Day } from "./day.type";

export type TimeSlot = {
    id: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
    day: string | Day;
    activity: string | Activity;
};

export type CreateTimeSlotDTO = {}

export type UpdateTimeSlotDTO = {}