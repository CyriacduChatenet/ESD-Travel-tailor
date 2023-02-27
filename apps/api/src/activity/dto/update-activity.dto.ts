import { UpdateActivityDTO } from '@travel-manager/types';

export class UpdateActivityDto implements UpdateActivityDTO {
  name: string;
  mark: number;
  travel?: any;
}
