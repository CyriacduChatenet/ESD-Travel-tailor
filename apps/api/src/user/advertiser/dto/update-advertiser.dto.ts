import { PartialType } from '@nestjs/mapped-types';

import { Activity } from '../../../activity/entities/activity.entity';
import { User } from '../../../user/entities/user.entity';
import { CreateAdvertiserDto } from './create-advertiser.dto';

export class UpdateAdvertiserDto extends PartialType(CreateAdvertiserDto) {
  name: string;
  location: string;
  activities: Activity[];
  user: User;
}
