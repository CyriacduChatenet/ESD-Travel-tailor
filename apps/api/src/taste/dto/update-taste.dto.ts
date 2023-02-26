import { UpdateTasteDTO } from '@travel-manager/types';

export class UpdateTasteDto implements UpdateTasteDTO {
  traveler: string;
  name: string;
}
