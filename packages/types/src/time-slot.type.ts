import { Activity } from "./activity.type";
import { Day } from "./day.type";

export type TimeSlot = {
    id: string;
    created_at: Date;
    updated_at: Date;
    startTime: Date;
    endTime: Date;
    deleted_at: Date | null;
    day:Day;
    activity: Activity;
};

export type CreateTimeSlotDTO = {}

export type UpdateTimeSlotDTO = {
    day?:Day;
    activity?: Activity;
}