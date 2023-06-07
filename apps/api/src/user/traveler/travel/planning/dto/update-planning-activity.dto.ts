import { IsString } from "class-validator";

export class UpdatePlanningActivityDto {
    @IsString()
    day_id: string;

    @IsString()
    time_slot_id: string;

    @IsString()
    new_activity_id: string;
};