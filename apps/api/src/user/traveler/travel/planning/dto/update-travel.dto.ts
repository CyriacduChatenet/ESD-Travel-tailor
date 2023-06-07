import { IsDate, IsString } from "class-validator";

export class UpdateTravelDto {
    @IsDate()
    departureDate: Date;
  
    @IsDate()
    returnDate: Date;

    @IsString()
    departureCity: string;

    @IsString()
    destinationCity: string;
};