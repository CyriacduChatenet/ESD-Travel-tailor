import { Activity } from 'src/activity/entities/activity.entity';
import { Traveler } from 'src/traveler/entities/traveler.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Activity, (activity) => activity.travel)
  activities: Activity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
