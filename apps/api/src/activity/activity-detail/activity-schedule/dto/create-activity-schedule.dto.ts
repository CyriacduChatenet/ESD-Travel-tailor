import { CreateActivityScheduleDTO } from '@travel-tailor/types';

export class CreateActivityScheduleDto implements CreateActivityScheduleDTO {
  opening_at: string;
  closing_at: string;
}
