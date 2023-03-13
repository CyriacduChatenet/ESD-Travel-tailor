import { Comment } from '../../comment/entities/comment.entity';
import { Advertiser } from '../../user/advertiser/entities/advertiser.entity';
import { Travel } from '../../user/traveler/travel/entities/travel.entity';
import { ActivityDetail } from '../activity-detail/entities/activity-detail.entity';
import { ActivityImage } from '../activity-image/entities/activity-image.entity';

export class UpdateActivityDto {
  name: string
  mark: number
  detail: ActivityDetail
  image: ActivityImage
  location?: string;
  source?: string;
  comments?: Comment[];
  travels?: Travel[];
  advertiser?: Advertiser;
}
