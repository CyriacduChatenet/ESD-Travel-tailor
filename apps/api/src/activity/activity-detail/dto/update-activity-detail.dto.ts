import { UpdateActivityDetailDTO } from '@travel-tailor/types';

export class UpdateActivityDetailDto implements UpdateActivityDetailDTO {
  duration: number;
  location: string;
}
