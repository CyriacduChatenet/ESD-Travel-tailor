import {
  Check,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../../config/enum/role.enum';
import { Advertiser } from '../advertiser/entities/advertiser.entity';
import { Traveler } from '../traveler/entities/traveler.entity';
import { Timestamp } from '../../config/utils/timestamp.util';
import { ResetPasswordToken } from '../../auth/reset-password-token/entities/reset-password-token.entity';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Traveler,
    nullable: false,
  })
  roles: Role;

  @OneToOne(() => Advertiser)
  @JoinColumn()
  advertiser: Advertiser;

  @OneToOne(() => Traveler)
  @JoinColumn()
  traveler: Traveler;

  @OneToOne(() => ResetPasswordToken)
  @JoinColumn()
  resetPasswordToken: ResetPasswordToken;
}
