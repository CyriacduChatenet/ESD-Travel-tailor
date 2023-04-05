import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Activity } from '../../../activity/entities/activity.entity';
import { Timestamp } from '../../../config/utils/timestamp.util';

@Entity()
export class ActivityTag extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false})
  name: string;

  @ManyToMany(() => Activity, activity => activity.tags)
  @JoinTable()
  activities: Activity[];
}
