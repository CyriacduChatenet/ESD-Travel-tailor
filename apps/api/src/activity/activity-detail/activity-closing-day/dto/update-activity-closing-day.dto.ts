import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityClosingDayDto } from './create-activity-closing-day.dto';

export class UpdateActivityClosingDayDto extends PartialType(
  CreateActivityClosingDayDto,
) {
  day: number;
  month: string;
  year: number;
  recurrence: boolean;
}
