import { UpdateDayDTO } from '@travel-tailor/types';

export class UpdateDayDto implements UpdateDayDTO {
    startTime: Date;
    endTime: Date;
    date: Date;
}
