import { IsDate, IsObject } from "class-validator";

import { Activity } from "../../../../../../activity/entities/activity.entity";
import { Day } from "../../entities/day.entity";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateTimeSlotDto {
    @IsObject()
    @ApiProperty({
        description: 'The day of the time slot',
        type: Day,
        example: 'day',
    })
    day?: Day;

    @IsObject()
    @ApiProperty({
        description: 'The activity of the time slot',
        type: Activity,
        example: 'activity',
    })
    activity?: Activity;

    @IsDate()
    @ApiProperty({
        description: 'The start time of the time slot',
        type: Date,
        example: '09:00',
    })
    startTime?: Date;

    @IsDate()
    @ApiProperty({
        description: 'The end time of the time slot',
        type: Date,
        example: '10:00',
    })
    endTime?: Date;
}
