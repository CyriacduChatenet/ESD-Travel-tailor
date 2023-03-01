import { CreateTravelDTO } from '@travel-tailor/types';

export class CreateTravelDto implements CreateTravelDTO {
  departureCity: string;
  destinationCity: string;
  departureDate: Date;
  returnDate: Date;
}
