import { Activity } from '../../../activity/entities/activity.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Timestamp } from '../../../utils/timestamp.util';
import { ActivitySchedule } from '../activity-schedule/entities/activity-schedule.entity';
import { ActivityClosingDay } from '../activity-closing-day/entities/activity-closing-day.entity';

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

  @ManyToOne(
    () => ActivitySchedule,
    (ActivitySchedule) => ActivitySchedule.activities,
  )
  schedule: ActivitySchedule;

  @OneToMany(
    () => ActivityClosingDay,
    (activityClosingDays) => activityClosingDays,
  )
  closingDays: ActivityClosingDay[];
}
