import { UpdateTasteDTO } from '@travel-tailor/types';
import { IsString } from 'class-validator';

export class UpdateTasteDto implements UpdateTasteDTO {
  @IsString()
  name: string;
}
