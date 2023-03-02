import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../../../../utils/timestamp.util';
import { Traveler } from '../../../../user/traveler/entities/traveler.entity';

@Entity()
export class Taste extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Traveler, (traveler) => traveler.tastes)
  traveler: Traveler;
}
