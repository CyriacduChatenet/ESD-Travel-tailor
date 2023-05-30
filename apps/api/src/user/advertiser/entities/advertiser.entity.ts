import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

import { User } from '../../entities/user.entity';
import { Timestamp } from '../../../config/utils/timestamp.util';
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
  
  @Exclude()
  @OneToOne(() => User, user => user.advertiser)
  @Transform(({ value }) => value && value.id) 
  user: User;

  @OneToOne(() => Customer, customer => customer.advertiser, { cascade: true })
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => Activity, (activity) => activity.advertiser)
  activities: Activity[];
}
