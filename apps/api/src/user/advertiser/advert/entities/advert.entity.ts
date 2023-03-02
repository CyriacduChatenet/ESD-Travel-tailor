import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../../utils/timestamp.util';
import { Advertiser } from '../../entities/advertiser.entity';

@Entity()
export class Advert extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Advertiser, (advertiser) => advertiser.adverts)
  advertiser: Advert;
}
