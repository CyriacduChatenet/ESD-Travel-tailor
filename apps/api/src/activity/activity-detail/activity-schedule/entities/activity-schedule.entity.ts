import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../../utils/timestamp.util';
import { ActivityDetail } from '../../entities/activity-detail.entity';

@Entity()
export class ActivitySchedule extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  opening_at: string;

  @Column()
  closing_at: string;

  @ManyToOne(() => ActivityDetail, activityDetail => activityDetail.schedules)
  activityDetail: ActivityDetail;
}
