import { PartialType } from '@nestjs/mapped-types';
import { Advert } from '../../advert/entities/advert.entity';
import { CreateAdvertiserDto } from './create-advertiser.dto';

export class UpdateAdvertiserDto extends PartialType(CreateAdvertiserDto) {
  name: string;
  location: string;
  adverts: Advert[];
  user: any;
}
