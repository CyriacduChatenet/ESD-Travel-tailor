import { CreateAdvertDTO } from '@travel-tailor/types';

export class CreateAdvertDto implements CreateAdvertDTO {
  name: string;
  advertiserId: string;
}
