import { ApiProperty } from '@nestjs/swagger';
import { UpdateDayDTO } from '@travel-tailor/types';
import { IsDate } from 'class-validator';

export class UpdateDayDto implements UpdateDayDTO {
    @IsDate()
    @ApiProperty({
        description: 'The start time of the day',
        type: Date,
        example: '09:00',
    })
    startTime: Date;

    @IsDate()
    @ApiProperty({
        description: 'The end time of the day',
        type: Date,
        example: '10:00',
    })
    endTime: Date;

    @IsDate()
    @ApiProperty({
        description: 'The date of the day',
        type: Date,
        example: '2021-01-01',
    })
    date: Date;
}
