import { Travel } from '../../user/traveler/travel/entities/travel.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActivityDetail } from '../activity-detail/entities/activity-detail.entity';
import { ActivityImage } from '../activity-image/entities/activity-image.entity';
import { Timestamp } from '../../utils/timestamp.util';
import { ActivityTag } from '../activity-tag/entities/activity-tag.entity';

@Entity()
export class Activity extends Timestamp {
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

  @OneToOne(() => ActivityImage, (activityImage) => activityImage.activity, {
    cascade: true,
  })
  @JoinColumn()
  activityImage: ActivityImage;

  @ManyToMany(() => ActivityTag, (activityTag) => activityTag.activities)
  @JoinTable()
  tags: ActivityTag[];
}
