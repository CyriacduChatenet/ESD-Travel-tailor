import { UpdateActivityClosingDayDTO } from '@travel-tailor/types';
import { IsBoolean, IsDate } from 'class-validator';

export class UpdateActivityClosingDayDto implements UpdateActivityClosingDayDTO {
  @IsBoolean()
  recurrence: boolean;

  @IsDate()
  date: Date;
}
