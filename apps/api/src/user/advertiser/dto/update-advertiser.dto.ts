import { PartialType } from '@nestjs/mapped-types';
import { Activity } from 'src/activity/entities/activity.entity';
import { CreateAdvertiserDto } from './create-advertiser.dto';

export class UpdateAdvertiserDto extends PartialType(CreateAdvertiserDto) {
  name: string;
  location: string;
  activities: Activity[];
  user: any;
}
