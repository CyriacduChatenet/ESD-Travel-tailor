import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Advert } from '../../advert/entities/advert.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Advertiser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToOne(() => User, (user) => user.advertiser)
  @JoinColumn()
  user: User;

  @OneToMany(() => Advert, (advert) => advert.advertiser)
  adverts: Advert[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
