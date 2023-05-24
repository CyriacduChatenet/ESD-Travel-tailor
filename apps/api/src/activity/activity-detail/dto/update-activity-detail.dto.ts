import { UpdateActivityDetailDTO } from '@travel-tailor/types';
import { IsNumber, IsString } from 'class-validator';

export class UpdateActivityDetailDto implements UpdateActivityDetailDTO {
  @IsNumber()
  duration: number;

  @IsString()
  location: string;
}
