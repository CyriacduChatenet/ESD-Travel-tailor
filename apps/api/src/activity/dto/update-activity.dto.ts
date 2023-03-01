import { UpdateActivityDTO } from '@travel-tailor/types';

export class UpdateActivityDto implements UpdateActivityDTO {
  name: string;
  mark: number;
  travel?: any;
}
