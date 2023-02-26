import { Traveler } from 'src/traveler/entities/traveler.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Travel {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
