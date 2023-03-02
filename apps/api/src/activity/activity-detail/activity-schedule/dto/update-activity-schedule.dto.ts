import { UpdateActivityScheduleDTO } from '@travel-tailor/types';

export class UpdateActivityScheduleDto implements UpdateActivityScheduleDTO {
  opening_at: string;
  closing_at: string;
}
