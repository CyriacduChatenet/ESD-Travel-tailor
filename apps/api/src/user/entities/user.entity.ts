import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from '../../auth/decorators/role.enum';
import { Advertiser } from '../../advertiser/entities/advertiser.entity';
import { Traveler } from '../../traveler/entities/traveler.entity';

@Entity()
export class User {
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
  roles: Role[];

  @OneToOne(() => Advertiser, {
    cascade: true,
  })
  @JoinColumn()
  advertiser: Advertiser;

  @OneToOne(() => Traveler, {
    cascade: true,
  })
  @JoinColumn()
  traveler: Traveler;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
