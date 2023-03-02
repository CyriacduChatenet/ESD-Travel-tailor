import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Activity } from '../../../../activity/entities/activity.entity';
import { Traveler } from '../../../../user/traveler/entities/traveler.entity';
import { Timestamp } from '../../../../utils/timestamp.util';

@Entity()
export class Travel extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  departureCity: string;

  @Column()
  destinationCity: string;

  @Column()
  departureDate: Date;

  @Column()
  returnDate: Date;

  @ManyToOne(() => Traveler, (traveler) => traveler.travels)
  traveler: Traveler;

  @OneToMany(() => Activity, (activity) => activity.travel)
  activities: Activity[];
}
