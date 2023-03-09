import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ManyToMany(() => Activity, activity => activity.travels)
  @JoinTable()
  activities: Activity[];
}
