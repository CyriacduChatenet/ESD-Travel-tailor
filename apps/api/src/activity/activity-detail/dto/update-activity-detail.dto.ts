import { ApiProperty } from '@nestjs/swagger';
import { UpdateActivityDetailDTO } from '@travel-tailor/types';
import { IsNumber, IsString } from 'class-validator';

export class UpdateActivityDetailDto implements UpdateActivityDetailDTO {
  @IsNumber()
  @ApiProperty({
    description: 'Duration',
    type: Number,
    default: 1,
    example: 1,
  })
  duration: number;

  @IsString()
  @ApiProperty({
    description: 'Location',
    type: String,
    default: 'Bali',
    example: 'Bali',
  })
  location: string;
}
