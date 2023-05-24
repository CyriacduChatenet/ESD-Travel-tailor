import { IsArray, IsObject, IsString } from 'class-validator';

import { Activity } from '../../../activity/entities/activity.entity';
import { User } from '../../../user/entities/user.entity';

export class UpdateAdvertiserDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsArray()
  activities: Activity[];

  @IsObject()
  user: User;
}
