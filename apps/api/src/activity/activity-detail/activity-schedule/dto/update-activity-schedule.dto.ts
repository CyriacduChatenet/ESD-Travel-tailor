import { UpdateActivityScheduleDTO } from '@travel-tailor/types';
import { IsString } from 'class-validator';

export class UpdateActivityScheduleDto implements UpdateActivityScheduleDTO {
  @IsString()
  opening_at: string;

  @IsString()
  closing_at: string;
}
