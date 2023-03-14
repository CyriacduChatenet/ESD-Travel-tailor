import { Activity } from 'src/activity/entities/activity.entity';

export class UpdateActivityTagDto {
  name: string;
  activities: Activity[];
}
