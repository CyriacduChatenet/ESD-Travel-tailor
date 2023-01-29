import { PartialType } from '@nestjs/mapped-types';
import { CreateAdvertDto } from './create-advert.dto';

export class UpdateAdvertDto extends PartialType(CreateAdvertDto) {
  name: string;
}
