import { IsObject, IsString } from "class-validator";
import { Activity } from "../../../activity/entities/activity.entity";


export class CreateAdvertiserDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsObject()
  activities: Activity[];
}
