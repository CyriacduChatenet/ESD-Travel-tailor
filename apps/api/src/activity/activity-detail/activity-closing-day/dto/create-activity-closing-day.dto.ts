import { ApiProperty } from '@nestjs/swagger';
import { CreateActivityClosingDayDTO } from '@travel-tailor/types';
import { IsBoolean, IsDate } from 'class-validator';

export class CreateActivityClosingDayDto implements CreateActivityClosingDayDTO {
  @IsBoolean()
  @ApiProperty({
    description: 'Recurrence',
    type: Boolean,
    default: false,
    example: false,
  })
  recurrence: boolean;

  @IsDate()
  @ApiProperty({
    description: 'Date',
    type: Date,
    default: new Date(),
    example: new Date(),
  })
  date: Date;
}
