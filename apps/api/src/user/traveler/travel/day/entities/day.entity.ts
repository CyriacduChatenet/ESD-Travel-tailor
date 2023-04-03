import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../../../../utils/timestamp.util";
import { Travel } from "../../entities/travel.entity";
import { TimeSlot } from "../time-slot/entities/time-slot.entity";

@Entity()
export class Day extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;

    @Column({ nullable: false })
    date: Date;

    @ManyToOne(() => Travel, (travel) => travel.days)
    travel: Travel;

    @ManyToMany(() => TimeSlot)
    @JoinTable()
    timeSlots: TimeSlot[]
}
