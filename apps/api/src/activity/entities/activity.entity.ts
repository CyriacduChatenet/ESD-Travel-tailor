import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Travel } from '../../user/traveler/travel/entities/travel.entity';
import { ActivityDetail } from '../activity-detail/entities/activity-detail.entity';
import { ActivityImage } from '../activity-image/entities/activity-image.entity';
import { Timestamp } from '../../utils/timestamp.util';
import { ActivityTag } from '../activity-tag/entities/activity-tag.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Activity extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  mark: number;

  @OneToOne(() => ActivityDetail, activityDetail => activityDetail.activity, { cascade: true })
  @JoinColumn()
  activityDetail: ActivityDetail;

  @OneToOne(() => ActivityImage, activityImage => activityImage.activity, { cascade: true })
  @JoinColumn()
  activityImage: ActivityImage;

  @ManyToMany(() => ActivityTag, activityTag => activityTag.activities)
  @JoinTable()
  activityTags: ActivityTag[];

  @OneToMany(() => Comment, comment => comment.activity)
  comments: Comment[];

  @ManyToMany(() => Travel, travel => travel.activities)
  travels: Travel[];
}
