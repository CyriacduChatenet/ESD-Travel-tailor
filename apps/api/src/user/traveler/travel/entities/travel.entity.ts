import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Traveler } from '../../../../user/traveler/entities/traveler.entity';
import { Timestamp } from '../../../../config/utils/timestamp.util';
import { Day } from '../day/entities/day.entity';

@Entity()
export class Travel extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  departureCity: string;

  @Column({ nullable: false })
  destinationCity: string;

  @Column({ nullable: false })
  departureDate: Date;

  @Column({ nullable: false })
  returnDate: Date;

  @ManyToOne(() => Traveler, (traveler) => traveler.travels)
  traveler: Traveler;

  @OneToMany(() => Day, day => day.travel)
  days: Day[];
}
