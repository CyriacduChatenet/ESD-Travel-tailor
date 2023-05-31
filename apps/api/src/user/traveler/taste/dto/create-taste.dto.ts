import { IsObject, IsString } from 'class-validator';
import { Traveler } from '../../entities/traveler.entity';

export class CreateTasteDto {
  @IsString()
  name: string;

  @IsObject()
  traveler?: Traveler;
}
