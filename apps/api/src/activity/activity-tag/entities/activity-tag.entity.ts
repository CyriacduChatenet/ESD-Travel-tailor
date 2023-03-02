import { Activity } from 'src/activity/entities/activity.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../utils/timestamp.util';

@Entity()
export class ActivityTag extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Activity, (activity) => activity.tags)
  activities: Activity[];
}
