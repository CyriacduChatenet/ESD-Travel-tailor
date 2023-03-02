import { CreateActivityDetailDTO } from '@travel-tailor/types';

export class CreateActivityDetailDto implements CreateActivityDetailDTO {
  duration: string;
  location: string;
}
