import { UpdateCommentDTO } from '@travel-tailor/types';

export class UpdateCommentDto implements UpdateCommentDTO {
  content: string;
  likes: number;
}
