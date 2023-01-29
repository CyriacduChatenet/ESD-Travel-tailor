import { Advert } from '../../advert/entities/advert.entity';

export class CreateAdvertiserDto {
  name: string;
  location: string;
  adverts: Advert[];
}
