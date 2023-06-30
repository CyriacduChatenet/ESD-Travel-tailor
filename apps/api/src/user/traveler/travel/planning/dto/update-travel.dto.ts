import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class UpdateTravelDto {
    @IsDate()
    @ApiProperty({
        description: 'The departure date of the travel',
        type: Date,
        example: '2021-01-01',
    })
    departureDate: Date;
  
    @IsDate()
    @ApiProperty({
        description: 'The return date of the travel',
        type: Date,
        example: '2021-01-01',
    })
    returnDate: Date;

    @IsString()
    @ApiProperty({
        description: 'The departure city of the travel',
        type: String,
        example: 'Paris',
    })
    departureCity: string;

    @IsString()
    @ApiProperty({
        description: 'The destination city of the travel',
        type: String,
        example: 'Paris',
    })
    destinationCity: string;
};