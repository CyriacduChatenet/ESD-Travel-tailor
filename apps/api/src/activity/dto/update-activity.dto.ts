import { ActivityDetail } from '../activity-detail/entities/activity-detail.entity';
import { ActivityImage } from '../activity-image/entities/activity-image.entity';

export class UpdateActivityDto {
  name: string
  mark: number
  detail: ActivityDetail
  image: ActivityImage
}
