import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../../auth/decorators/role.enum';
import { Advertiser } from '../advertiser/entities/advertiser.entity';
import { Traveler } from '../traveler/entities/traveler.entity';
import { ResetPasswordToken } from '../../auth/reset-password-token/entities/reset-password-token.entity';
import { Timestamp } from '../../utils/timestamp.util';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Traveler,
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
