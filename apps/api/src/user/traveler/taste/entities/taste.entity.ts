import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../../config/utils/timestamp.util';
import { Traveler } from '../../../../user/traveler/entities/traveler.entity';

@Entity()
export class Taste extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false})
  name: string;

  @ManyToOne(() => Traveler, (traveler) => traveler.tastes)
  traveler: Traveler;
}
