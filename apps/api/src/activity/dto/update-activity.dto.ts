import { IsArray, IsObject, IsString } from 'class-validator';

import { TimeSlot } from '../../user/traveler/travel/day/time-slot/entities/time-slot.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Advertiser } from '../../user/advertiser/entities/advertiser.entity';
import { ActivityDetail } from '../activity-detail/entities/activity-detail.entity';
import { ActivityImage } from '../activity-image/entities/activity-image.entity';
import { ActivityTag } from '../activity-tag/entities/activity-tag.entity';
import { UpdateActivityMarkDto } from '../activity-mark/dto/update-activity-mark.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityDto {
  @IsString()
  @ApiProperty({
    description: 'Name',
    type: String,
    default: 'Name',
    example: 'Name',
  })
  name?: string

  @IsString()
  @ApiProperty({
    description: 'Description',
    type: String,
    default: 'Description',
    example: 'Description',
  })
  description: string

  @IsObject()
  @ApiProperty({
    description: 'UpdateActivityMarkDto',
    type: UpdateActivityMarkDto,
    default: 'UpdateActivityMarkDto',
    example: 'UpdateActivityMarkDto',
  })
  marks?: UpdateActivityMarkDto

  @IsObject()
  @ApiProperty({
    description: 'ActivityDetail',
    type: ActivityDetail,
    default: 'ActivityDetail',
    example: 'ActivityDetail',
  })
  detail?: ActivityDetail

  @IsObject()
  @ApiProperty({
    description: 'ActivityImage',
    type: ActivityImage,
    default: 'ActivityImage',
    example: 'ActivityImage',
  })
  image?: ActivityImage

  @IsString()
  @ApiProperty({
    description: 'Location',
    type: String,
    default: 'Location',
    example: 'Location',
  })
  location?: string;

  @IsString()
  @ApiProperty({
    description: 'Source',
    type: String,
    default: 'Source',
    example: 'Source',
  })
  source?: string;

  @IsArray()
  @ApiProperty({
    description: 'Comment',
    type: Comment,
    default: 'Comment',
    example: 'Comment',
  })
  comments?: Comment[];

  @IsObject()
  @ApiProperty({
    description: 'Advertiser',
    type: Advertiser,
    default: 'Advertiser',
    example: 'Advertiser',
  })
  advertiser?: Advertiser;

  @IsArray()
  @ApiProperty({
    description: 'ActivityTag',
    type: ActivityTag,
    default: 'ActivityTag',
    example: 'ActivityTag',
  })
  tags?: ActivityTag[];

  @IsArray()
  @ApiProperty({
    description: 'TimeSlot',
    type: TimeSlot,
    default: 'TimeSlot',
    example: 'TimeSlot',
  })
  timeSlots?: TimeSlot[];
}
