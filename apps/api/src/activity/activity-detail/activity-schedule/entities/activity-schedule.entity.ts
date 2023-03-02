import { Activity } from 'src/activity/entities/activity.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../../utils/timestamp.util';

@Entity()
export class ActivitySchedule extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  opening_at: string;

  @Column()
  closing_at: string;

  @OneToMany(() => Activity, (activities) => activities)
  activities: Activity[];
}
