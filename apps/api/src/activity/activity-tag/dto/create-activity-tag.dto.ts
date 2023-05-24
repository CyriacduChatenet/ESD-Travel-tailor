import { CreateActivityTagDTO } from '@travel-tailor/types';
import { IsString } from 'class-validator';

export class CreateActivityTagDto implements CreateActivityTagDTO {
  @IsString()
  name: string;
}
