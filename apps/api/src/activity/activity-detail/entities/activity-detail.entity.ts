import { Activity } from '../../../activity/entities/activity.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActivityDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  duration: string;

  @Column()
  location: string;

  @OneToOne(() => Activity, (activity) => activity.activityDetail)
  activity: Activity;
}
