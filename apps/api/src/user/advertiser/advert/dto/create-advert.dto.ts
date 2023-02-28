import { CreateAdvertDTO } from '@travel-manager/types';

export class CreateAdvertDto implements CreateAdvertDTO {
  name: string;
  advertiserId: string;
}
