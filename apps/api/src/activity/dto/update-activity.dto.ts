import { UpdateActivityDTO } from '@travel-manager/types';

export class UpdateActivityDto implements UpdateActivityDTO {
  travel: string;
  name: string;
  mark: number;
}
