import { CreateActivityClosingDayDTO } from '@travel-tailor/types';

export class CreateActivityClosingDayDto
  implements CreateActivityClosingDayDTO
{
  reccurence: string;
  day: number;
  month: string;
  year: number;
  recurrence: boolean;
}
