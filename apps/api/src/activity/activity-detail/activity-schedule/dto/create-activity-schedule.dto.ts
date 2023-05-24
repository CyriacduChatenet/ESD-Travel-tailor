import { CreateActivityScheduleDTO } from '@travel-tailor/types';
import { IsString } from 'class-validator';

export class CreateActivityScheduleDto implements CreateActivityScheduleDTO {
  @IsString()
  opening_at: string;

  @IsString()
  closing_at: string;
}
