import { ApiProperty } from '@nestjs/swagger'
import { UpdateCommentDTO } from '@travel-tailor/types'
import { IsNumber, IsString } from 'class-validator'

export class UpdateCommentDto implements UpdateCommentDTO {
  @IsString()
  @ApiProperty({
    description: 'Content',
    type: String,
    default: 'Content',
    example: 'Content',
  })
  content: string

  @IsString()
  @ApiProperty({
    description: 'Activity',
    type: String,
    default: 'Activity',
    example: 'Activity',
  })
  likes: number
}
