import { CommentMark, CreateCommentDTO } from '@travel-tailor/types';
import { IsObject, IsString } from 'class-validator';

export class CreateCommentDto implements CreateCommentDTO {
  @IsString()
  content: string;

  @IsString()
  likes: number;

  @IsObject()
  marks: CommentMark;
}
