import { ActivityDetail, CreateActivityClosingDayDTO } from '@travel-tailor/types';

export class CreateActivityClosingDayDto
  implements CreateActivityClosingDayDTO
{
  recurrence: boolean;
  date: Date;
}
