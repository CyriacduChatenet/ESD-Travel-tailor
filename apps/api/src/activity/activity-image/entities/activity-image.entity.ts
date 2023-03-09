import { Activity } from '../../../activity/entities/activity.entity';
import { Timestamp } from '../../../utils/timestamp.util';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActivityImage extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  source: string;

  @OneToOne(() => Activity, activity => activity.activityImage)
  @JoinColumn()
  activity: Activity;
}
