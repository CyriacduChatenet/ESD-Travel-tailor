import { ApiProperty } from '@nestjs/swagger';
import { UpdateActivityClosingDayDTO } from '@travel-tailor/types';
import { IsBoolean, IsDate } from 'class-validator';

export class UpdateActivityClosingDayDto implements UpdateActivityClosingDayDTO {
  @IsBoolean()
  @ApiProperty({
      description: 'Recurrence',
      type: Boolean,
      default: false,
    })
  recurrence: boolean;

  @IsDate()
  @ApiProperty({
      description: 'Closing date',
      type: Date,
      default: new Date(),
    })
  date: Date;
}
