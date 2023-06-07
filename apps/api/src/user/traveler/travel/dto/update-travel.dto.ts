import { UpdateTravelDTO } from '@travel-tailor/types';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateTravelDto implements UpdateTravelDTO {
  @IsString()
  departureCity?: string;

  @IsString()
  destinationCity?: string;

  @IsDate()
  departureDate?: Date;

  @IsDate()
  returnDate?: Date;

  @IsBoolean()
  validate?: boolean;
}
