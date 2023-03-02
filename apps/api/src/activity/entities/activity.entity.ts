import { Travel } from '../../user/traveler/travel/entities/travel.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActivityDetail } from '../activity-detail/entities/activity-detail.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  mark: number;

  @ManyToOne(() => Travel, (travel) => travel.activities)
  travel: Travel;

  @OneToOne(() => ActivityDetail, (activityDetail) => activityDetail.activity, {
    cascade: true,
  })
  @JoinColumn()
  activityDetail: ActivityDetail;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
