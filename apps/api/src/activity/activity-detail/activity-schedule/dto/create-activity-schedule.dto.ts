import { ApiProperty } from '@nestjs/swagger';
import { CreateActivityScheduleDTO } from '@travel-tailor/types';
import { IsString } from 'class-validator';

export class CreateActivityScheduleDto implements CreateActivityScheduleDTO {
  @IsString()
  @ApiProperty({
    description: 'Opening at',
    type: String,
    default: '08:00',
    example: '08:00',
  })
  opening_at: string;

  @IsString()
  @ApiProperty({
    description: 'Closing at',
    type: String,
    default: '17:00',
    example: '17:00',
  })
  closing_at: string;
}
