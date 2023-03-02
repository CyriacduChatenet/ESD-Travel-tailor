import { Timestamp } from '../../../utils/timestamp.util';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../../user/entities/user.entity';

@Entity()
export class ResetPasswordToken extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @OneToOne(() => User, (user) => user.resetPasswordToken)
  @JoinColumn()
  user: User;
}
