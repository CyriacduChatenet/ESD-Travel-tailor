import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Activity } from '../../../activity/entities/activity.entity';
import { Timestamp } from '../../../utils/timestamp.util';

@Entity()
export class ActivityImage extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  source: string;

  @OneToOne(() => Activity, (activity) => activity.image)
  activity: Activity;
}
