import { Activity } from 'src/activity/entities/activity.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActivityImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  source: string;

  @OneToOne(() => Activity, (activity) => activity.activityImage)
  activity: Activity;
}
