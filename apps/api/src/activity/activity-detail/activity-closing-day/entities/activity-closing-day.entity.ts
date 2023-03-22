import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../../utils/timestamp.util';
import { ActivityDetail } from '../../entities/activity-detail.entity';

@Entity()
export class ActivityClosingDay extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false})
  date: string;

  @Column({ nullable: false})
  recurrence: boolean;

  @ManyToOne(() => ActivityDetail, activityDetail => activityDetail.closingDays)
  activityDetail: ActivityDetail;
}
