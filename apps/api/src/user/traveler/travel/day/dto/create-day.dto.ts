import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class CreateDayDto {
    @IsString()
    @ApiProperty({
        description: 'The name of the day',
        type: String,
        example: '09:00',
    })
    startTime?: string;

    @IsString()
    @ApiProperty({
        description: 'The name of the day',
        type: String,
        example: '11:00',
    })
    endTime?: string;

    @IsDate()
    @ApiProperty({
        description: 'The name of the day',
        type: Date,
        example: '2021-01-01',
    })
    date: Date;
}
