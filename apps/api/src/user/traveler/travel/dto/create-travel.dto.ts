import { ApiProperty } from '@nestjs/swagger';
import { CreateTravelDTO } from '@travel-tailor/types';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateTravelDto implements CreateTravelDTO {
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

  @IsBoolean()
  @ApiProperty({
    description: 'The validation of the travel',
    type: Boolean,
    example: false,
  })
  validate: boolean;
}
