import { CreateActivityDetailDTO } from '@travel-tailor/types';

export class CreateActivityDetailDto implements CreateActivityDetailDTO {
  duration: number;
  location: string;
}
