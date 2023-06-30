import { ApiProperty } from '@nestjs/swagger';
import { CommentMark, CreateCommentDTO } from '@travel-tailor/types';
import { IsObject, IsString } from 'class-validator';

export class CreateCommentDto implements CreateCommentDTO {
  @IsString()
  @ApiProperty({
    description: 'Content',
    type: String,
    default: 'Content',
    example: 'Content',
  })
  content: string;

  @IsString()
  @ApiProperty({
    description: 'Activity',
    type: String,
    default: 'Activity',
    example: 'Activity',
  })
  likes: number;

  @IsObject()
  marks: CommentMark;
}
