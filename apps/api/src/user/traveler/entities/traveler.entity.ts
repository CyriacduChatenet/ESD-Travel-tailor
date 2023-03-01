import { Comment } from '../../../comment/entities/comment.entity';
import { Taste } from '../../../user/traveler/taste/entities/taste.entity';
import { Travel } from '../../../user/traveler/travel/entities/travel.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from '../../entities/user.entity';

@Entity()
export class Traveler {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.traveler)
  @JoinColumn()
  user: User;

  @OneToMany(() => Taste, (taste) => taste.traveler)
  tastes: Taste[];

  @OneToMany(() => Travel, (travel) => travel.traveler)
  travels: Travel[];

  @OneToMany(() => Comment, (comment) => comment.traveler)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
