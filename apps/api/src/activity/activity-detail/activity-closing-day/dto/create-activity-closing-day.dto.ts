import { CreateActivityClosingDayDTO } from '@travel-tailor/types';
import { IsBoolean, IsDate } from 'class-validator';

export class CreateActivityClosingDayDto implements CreateActivityClosingDayDTO {
  @IsBoolean()
  recurrence: boolean;

  @IsDate()
  date: Date;
}
