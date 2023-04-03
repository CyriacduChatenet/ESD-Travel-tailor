import { UpdateDayDTO } from '@travel-tailor/types';

export class UpdateDayDto implements UpdateDayDTO {
    startTime: string;
    endTime: string;
    date: Date;
}
