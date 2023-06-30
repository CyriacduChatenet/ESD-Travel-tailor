import { IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Traveler } from '../../entities/traveler.entity';

export class CreateTasteDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the taste',
    type: String,
    example: 'John Doe',
  })
  name: string;

  @IsObject()
  @ApiProperty({
    description: 'The traveler of the taste',
    type: Traveler,
    example: 'traveler',
  })
  traveler?: Traveler;
}
