import { IsObject, IsString } from "class-validator"

import { CreateActivityDetailDto } from "../activity-detail/dto/create-activity-detail.dto"
import { CreateActivityImageDto } from "../activity-image/dto/create-activity-image.dto"
import { CreateActivityMarkDto } from "../activity-mark/dto/create-activity-mark.dto"

export class CreateActivityDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsObject()
  marks?: CreateActivityMarkDto

  @IsObject()
  detail: CreateActivityDetailDto

  @IsObject()
  image: CreateActivityImageDto
}
