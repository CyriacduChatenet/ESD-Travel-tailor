import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Activity } from '../../../activity/entities/activity.entity';
import { Timestamp } from '../../../config/utils/timestamp.util';

@Entity()
export class ActivityImage extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  source: string;

  @OneToOne(() => Activity, (activity) => activity.image)
  activity: Activity;
}
