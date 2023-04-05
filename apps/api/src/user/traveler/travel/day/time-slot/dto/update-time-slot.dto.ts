import { Activity } from "src/activity/entities/activity.entity";
import { Day } from "../../entities/day.entity";


export class UpdateTimeSlotDto {
    day?: Day;
    activity?: Activity;
    startTime?: Date;
    endTime?: Date;
}
