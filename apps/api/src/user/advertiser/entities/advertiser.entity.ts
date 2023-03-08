import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Advert } from '../advert/entities/advert.entity';
import { User } from '../../entities/user.entity';
import { Timestamp } from '../../../utils/timestamp.util';

@Entity()
export class Advertiser extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;
  
  @OneToOne(() => User, user => user.advertiser)
  user: User;

  @OneToMany(() => Advert, (advert) => advert.advertiser)
  adverts: Advert[];
}
