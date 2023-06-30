import { IsObject, IsString } from "class-validator"

import { CreateActivityDetailDto } from "../activity-detail/dto/create-activity-detail.dto"
import { CreateActivityImageDto } from "../activity-image/dto/create-activity-image.dto"
import { CreateActivityMarkDto } from "../activity-mark/dto/create-activity-mark.dto"
import { ApiProperty } from "@nestjs/swagger"

export class CreateActivityDto {
  @IsString()
  @ApiProperty({
    description: "Name",
    type: String,
    default: "Name",
    example: "Name",
  })
  name: string

  @IsString()
  @ApiProperty({
    description: "Description",
    type: String,
    default: "Description",
    example: "Description",
  })
  description: string

  @IsObject()
  @ApiProperty({
    description: "Marks",
    type: CreateActivityMarkDto,
    default: {},
    example: {},
  })
  marks?: CreateActivityMarkDto

  @IsObject()
  @ApiProperty({
    description: "Detail",
    type: CreateActivityDetailDto,
    default: {},
    example: {},
  })
  detail: CreateActivityDetailDto

  @IsObject()
  @ApiProperty({
    description: "Image",
    type: CreateActivityImageDto,
    default: {},
    example: {},
  })
  image: CreateActivityImageDto
}
