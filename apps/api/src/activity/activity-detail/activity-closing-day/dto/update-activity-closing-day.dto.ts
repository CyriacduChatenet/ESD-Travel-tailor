import { ActivityDetail, UpdateActivityClosingDayDTO } from '@travel-tailor/types';

export class UpdateActivityClosingDayDto
  implements UpdateActivityClosingDayDTO
{
  recurrence: boolean;
  date: Date;
}
