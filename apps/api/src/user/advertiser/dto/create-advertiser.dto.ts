import { Activity } from "src/activity/entities/activity.entity";


export class CreateAdvertiserDto {
  name: string;
  location: string;
  activities: Activity[];
}
