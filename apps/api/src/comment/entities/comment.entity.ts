import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Traveler } from '../../user/traveler/entities/traveler.entity';
import { Timestamp } from '../../utils/timestamp.util';

@Entity()
export class Comment extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  likes: number;

  @ManyToOne(() => Traveler, (traveler) => traveler.comments)
  traveler: Traveler;
}
