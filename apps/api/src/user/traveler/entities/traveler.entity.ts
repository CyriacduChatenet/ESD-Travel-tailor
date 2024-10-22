import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

import { Comment } from '../../../comment/entities/comment.entity';
import { Taste } from '../../../user/traveler/taste/entities/taste.entity';
import { Travel } from '../../../user/traveler/travel/entities/travel.entity';
import { User } from '../../entities/user.entity';
import { Timestamp } from '../../../config/utils/timestamp.util';

@Entity()
export class Traveler extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @OneToOne(() => User)
  @JoinColumn()
  @Transform(({ value }) => value && value.id) 
  user: User;

  @OneToMany(() => Taste, (taste) => taste.traveler)
  tastes: Taste[];

  @OneToMany(() => Travel, (travel) => travel.traveler)
  travels: Travel[];

  @OneToMany(() => Comment, (comment) => comment.traveler)
  comments: Comment[];
}
