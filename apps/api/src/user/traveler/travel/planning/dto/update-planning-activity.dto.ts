import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePlanningActivityDto {
    @IsString()
    @ApiProperty({
        description: 'The id of the planning activity',
        type: String,
        example: 'id',
    })
    day_id: string;

    @IsString()
    @ApiProperty({
        description: 'The id of the planning activity',
        type: String,
        example: 'id',
    })
    time_slot_id: string;

    @IsString()
    @ApiProperty({
        description: 'The id of the planning activity',
        type: String,
        example: 'id',
    })
    new_activity_id: string;
};