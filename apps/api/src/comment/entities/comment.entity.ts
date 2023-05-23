import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Traveler } from '../../user/traveler/entities/traveler.entity';
import { Activity } from '../../activity/entities/activity.entity';
import { Timestamp } from '../../config/utils/timestamp.util';
import { CommentMark } from '../../comment-mark/entities/comment-mark.entity';

@Entity()
export class Comment extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  content: string;

  @Column({ default: 0 })
  likes: number;

  @OneToOne(() => CommentMark, (commentMark) => commentMark.comment, {
    cascade: true,
  })
  @JoinColumn()
  marks: CommentMark;

  @ManyToOne(() => Traveler, (traveler) => traveler.comments)
  traveler: Traveler;

  @ManyToOne(() => Activity, activity => activity.comments)
  activity: Activity;
}
