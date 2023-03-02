import { UpdateActivityClosingDayDTO } from '@travel-tailor/types';

export class UpdateActivityClosingDayDto
  implements UpdateActivityClosingDayDTO
{
  reccurence: string;
  day: number;
  month: string;
  year: number;
  recurrence: boolean;
}
