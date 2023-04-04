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

import { ActivityDetail } from '../activity-detail/entities/activity-detail.entity';
import { ActivityImage } from '../activity-image/entities/activity-image.entity';
import { Timestamp } from '../../config/utils/timestamp.util';
import { ActivityTag } from '../activity-tag/entities/activity-tag.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Advertiser } from '../../user/advertiser/entities/advertiser.entity';
import { TimeSlot } from '../../user/traveler/travel/day/time-slot/entities/time-slot.entity';

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

  @ManyToOne(() => Advertiser, (advertiser) => advertiser.activities)
  advertiser: Advertiser;

  @ManyToMany(() => ActivityTag)
  @JoinTable()
  tags: ActivityTag[]

  @OneToOne(() => TimeSlot, timeSlot => timeSlot.activity)
  timeSlot: TimeSlot;
}
