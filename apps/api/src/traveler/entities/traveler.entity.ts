import { Taste } from 'src/taste/entities/taste.entity';
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

import { User } from '../../user/entities/user.entity';

@Entity()
export class Traveler {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.traveler)
  @JoinColumn()
  user: User;

  @OneToMany(() => Taste, (taste) => taste.traveler)
  tastes: Taste[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
