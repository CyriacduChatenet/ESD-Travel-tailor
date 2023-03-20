import { Activity } from '../../../activity/entities/activity.entity';

export class UpdateActivityTagDto {
  name: string;
  activities: Activity[];
}
