import { IsArray, IsObject, IsString } from 'class-validator';

import { TimeSlot } from '../../user/traveler/travel/day/time-slot/entities/time-slot.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Advertiser } from '../../user/advertiser/entities/advertiser.entity';
import { ActivityDetail } from '../activity-detail/entities/activity-detail.entity';
import { ActivityImage } from '../activity-image/entities/activity-image.entity';
import { ActivityTag } from '../activity-tag/entities/activity-tag.entity';
import { UpdateActivityMarkDto } from '../activity-mark/dto/update-activity-mark.dto';

export class UpdateActivityDto {
  @IsString()
  name?: string

  @IsObject()
  marks?: UpdateActivityMarkDto

  @IsObject()
  detail?: ActivityDetail

  @IsObject()
  image?: ActivityImage

  @IsString()
  location?: string;

  @IsString()
  source?: string;

  @IsArray()
  comments?: Comment[];

  @IsObject()
  advertiser?: Advertiser;

  @IsArray()
  tags?: ActivityTag[];

  @IsArray()
  timeSlots?: TimeSlot[];
}
