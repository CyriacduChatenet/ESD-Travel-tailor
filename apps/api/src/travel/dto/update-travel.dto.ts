import { UpdateTravelDTO } from '@travel-manager/types';

export class UpdateTravelDto implements UpdateTravelDTO {
  departureCity: string;
  destinationCity: string;
  departureDate: Date;
  returnDate: Date;
}
