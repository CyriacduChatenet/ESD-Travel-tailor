import { UpdateDayDTO } from '@travel-tailor/types';
import { IsDate } from 'class-validator';

export class UpdateDayDto implements UpdateDayDTO {
    @IsDate()
    startTime: Date;

    @IsDate()
    endTime: Date;

    @IsDate()
    date: Date;
}
