import { CreateActivityDetailDTO } from '@travel-tailor/types';
import { IsNumber, IsString } from 'class-validator';

export class CreateActivityDetailDto implements CreateActivityDetailDTO {
  @IsNumber()
  duration: number;

  @IsString()
  location: string;
}
