import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelerDto } from './create-traveler.dto';

export class UpdateTravelerDTO extends PartialType(CreateTravelerDto) {
  user: string;
  tastes: string;
}
