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
import { Advertiser } from '../../user/advertiser/entities/advertiser.entity';
import { Day } from 'src/user/traveler/travel/day/entities/day.entity';

@Entity()
export class Activity extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false})
  name: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column({ nullable: false, default: 0})
  mark: number;

  @OneToOne(() => ActivityImage, (image) => image.activity, {
    cascade: true,
  })
  @JoinColumn()
  image: ActivityImage;

  @OneToOne(() => ActivityDetail, (detail) => detail.activity, {
    cascade: true,
  })
  @JoinColumn()
  detail: ActivityDetail;

  @OneToMany(() => Comment, comment => comment.activity)
  comments: Comment[];

  @ManyToMany(() => Day, day => day.activities)
  @JoinTable()
  days: Day[];

  @ManyToOne(() => Advertiser, (advertiser) => advertiser.activities)
  advertiser: Advertiser;

  @ManyToMany(() => ActivityTag)
  @JoinTable()
  tags: ActivityTag[]
}
