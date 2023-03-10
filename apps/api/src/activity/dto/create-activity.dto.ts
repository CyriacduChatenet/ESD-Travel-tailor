import { CreateActivityDetailDto } from "../activity-detail/dto/create-activity-detail.dto"
import { CreateActivityImageDto } from "../activity-image/dto/create-activity-image.dto"


export class CreateActivityDto {
  name: string
  mark: number
  detail: CreateActivityDetailDto
  image: CreateActivityImageDto
}
