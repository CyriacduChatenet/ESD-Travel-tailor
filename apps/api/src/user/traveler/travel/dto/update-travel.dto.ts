import { UpdateTravelDTO } from '@travel-tailor/types';

export class UpdateTravelDto implements UpdateTravelDTO {
  departureCity: string;
  destinationCity: string;
  departureDate: Date;
  returnDate: Date;
}
