import { UpdateActivityTagDTO } from '@travel-tailor/types';

export class UpdateActivityTagDto implements UpdateActivityTagDTO {
  name: string;
  activities?: any[];
}
