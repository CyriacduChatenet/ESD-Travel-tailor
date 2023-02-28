import { CreateTravelDTO } from '@travel-manager/types';

export class CreateTravelDto implements CreateTravelDTO {
  departureCity: string;
  destinationCity: string;
  departureDate: Date;
  returnDate: Date;
}
