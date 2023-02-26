import { UpdateCommentDTO } from '@travel-manager/types';

export class UpdateCommentDto implements UpdateCommentDTO {
  content: string;
  likes: number;
  traveler: string;
}
