import { UpdateCommentDTO } from '@travel-tailor/types';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto implements UpdateCommentDTO {
  @IsString()
  content: string;

  @IsNumber()
  likes: number;
}
