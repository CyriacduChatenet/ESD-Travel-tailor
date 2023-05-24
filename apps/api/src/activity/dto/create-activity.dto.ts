import { ActivityMark } from "@travel-tailor/types"

import { CreateActivityDetailDto } from "../activity-detail/dto/create-activity-detail.dto"
import { CreateActivityImageDto } from "../activity-image/dto/create-activity-image.dto"
import { CreateActivityMarkDto } from "../activity-mark/dto/create-activity-mark.dto"


export class CreateActivityDto {
  name: string
  marks?: CreateActivityMarkDto
  detail: CreateActivityDetailDto
  image: CreateActivityImageDto
}
