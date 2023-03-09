import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../../utils/timestamp.util';
import { ActivityDetail } from '../../entities/activity-detail.entity';

@Entity()
export class ActivityClosingDay extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: number;

  @Column()
  month: string;

  @Column()
  year: number;

  @Column()
  recurrence: boolean;

  @ManyToOne(() => ActivityDetail, activityDetail => activityDetail.closingDays)
  activityDetail: ActivityDetail;
}
