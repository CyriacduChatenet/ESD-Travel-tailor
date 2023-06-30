import { ApiProperty } from '@nestjs/swagger';
import { UpdateTasteDTO } from '@travel-tailor/types';
import { IsString } from 'class-validator';

export class UpdateTasteDto implements UpdateTasteDTO {
  @IsString()
  @ApiProperty({
    description: 'The name of the taste',
    type: String,
    example: 'John Doe',
  })
  name: string;
}
