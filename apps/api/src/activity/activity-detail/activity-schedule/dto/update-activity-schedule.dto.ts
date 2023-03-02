import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityScheduleDto } from './create-activity-schedule.dto';

export class UpdateActivityScheduleDto extends PartialType(
  CreateActivityScheduleDto,
) {
  opening_at: string;
  closing_at: string;
}
