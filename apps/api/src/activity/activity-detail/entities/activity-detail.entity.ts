import { Activity } from '../../../activity/entities/activity.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../utils/timestamp.util';

@Entity()
export class ActivityDetail extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  duration: string;

  @Column()
  location: string;

  @OneToOne(() => Activity, (activity) => activity.activityDetail)
  activity: Activity;
}
