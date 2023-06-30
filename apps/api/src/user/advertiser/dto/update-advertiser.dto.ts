import { IsArray, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Activity } from '../../../activity/entities/activity.entity';
import { User } from '../../../user/entities/user.entity';

export class UpdateAdvertiserDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the advertiser',
    type: String,
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'The location of the advertiser',
    type: String,
    example: 'New York',
  })
  location: string;

  @IsArray()
  @ApiProperty({
    description: 'The activities of the advertiser',
    type: [Activity],
    example: ['activity1', 'activity2'],
  })
  activities: Activity[];

  @IsObject()
  @ApiProperty({
    description: 'The user of the advertiser',
    type: User,
    example: 'user',
  })
  user: User;
}
