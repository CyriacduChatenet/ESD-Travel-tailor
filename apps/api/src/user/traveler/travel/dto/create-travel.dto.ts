import { CreateTravelDTO } from '@travel-tailor/types';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateTravelDto implements CreateTravelDTO {
  @IsString()
  departureCity: string;

  @IsString()
  destinationCity: string;

  @IsDate()
  departureDate: Date;

  @IsDate()
  returnDate: Date;

  @IsBoolean()
  validate: boolean;
}
