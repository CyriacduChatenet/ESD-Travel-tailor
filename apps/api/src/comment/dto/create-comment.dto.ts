import { CreateCommentDTO } from '@travel-manager/types';

export class CreateCommentDto implements CreateCommentDTO {
  content: string;
  likes: number;
}
