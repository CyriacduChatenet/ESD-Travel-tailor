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
import { Customer } from '../../../payment/customer/entities/customer.entity';

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

  @OneToOne(() => Customer, customer => customer.advertiser)
  customer: Customer;

  @OneToMany(() => Activity, (activity) => activity.advertiser)
  activities: Activity[];
}
