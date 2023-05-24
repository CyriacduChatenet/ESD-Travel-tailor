import { IsDate, IsObject } from "class-validator";

import { Activity } from "../../../../../../activity/entities/activity.entity";
import { Day } from "../../entities/day.entity";


export class UpdateTimeSlotDto {
    @IsObject()
    day?: Day;

    @IsObject()
    activity?: Activity;

    @IsDate()
    startTime?: Date;

    @IsDate()
    endTime?: Date;
}
