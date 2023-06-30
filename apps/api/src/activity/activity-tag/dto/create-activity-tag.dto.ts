import { ApiProperty } from '@nestjs/swagger';
import { CreateActivityTagDTO } from '@travel-tailor/types';
import { IsString } from 'class-validator';

export class CreateActivityTagDto implements CreateActivityTagDTO {
  @IsString()
  @ApiProperty({
    description: 'Name',
    type: String,
    default: 'Name',
    example: 'Name',
  })
  name: string;
}
