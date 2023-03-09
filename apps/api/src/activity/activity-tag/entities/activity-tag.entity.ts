import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../utils/timestamp.util';
import { Activity } from '../../../activity/entities/activity.entity';

@Entity()
export class ActivityTag extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Activity, activity => activity.activityTags)
  activities: Activity[];


}
