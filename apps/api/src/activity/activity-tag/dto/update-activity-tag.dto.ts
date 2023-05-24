import { IsArray, IsString } from 'class-validator';

import { Activity } from '../../../activity/entities/activity.entity';

export class UpdateActivityTagDto {
  @IsString()
  name: string;

  @IsArray()
  activities: Activity[];
}
