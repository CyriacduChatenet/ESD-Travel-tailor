import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../entities/user.entity';
import { Timestamp } from '../../../utils/timestamp.util';
import { Activity } from '../../../activity/entities/activity.entity';

@Entity()
export class Advertiser extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false})
  name: string;

  @Column({ nullable: false})
  location: string;
  
  @OneToOne(() => User, user => user.advertiser)
  user: User;

  @OneToMany(() => Activity, (activity) => activity.advertiser)
  activities: Activity[];
}
