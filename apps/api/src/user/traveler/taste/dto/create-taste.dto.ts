import { CreateTasteDTO } from '@travel-tailor/types';
import { IsString } from 'class-validator';

export class CreateTasteDto implements CreateTasteDTO {
  @IsString()
  name: string;
}
