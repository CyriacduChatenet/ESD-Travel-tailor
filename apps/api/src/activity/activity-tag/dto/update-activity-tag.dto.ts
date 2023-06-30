import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Activity } from '../../../activity/entities/activity.entity';

export class UpdateActivityTagDto {
  @IsString()
  @ApiProperty({
    description: 'Name',
    type: String,
    default: 'Name',
    example: 'Name',
  })
  name: string;

  @IsArray()
  @ApiProperty({
    description: 'Activities',
    type: [Activity],
    default: [],
    example: [],
  })
  activities: Activity[];
}
