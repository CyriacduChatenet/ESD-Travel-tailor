import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../../../../utils/timestamp.util";
import { Travel } from "../../entities/travel.entity";
import { TimeSlot } from "../time-slot/entities/time-slot.entity";

@Entity()
export class Day extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, default: '8:00' })
    startTime: string;

    @Column({ nullable: false, default: '0:00' })
    endTime: string;

    @Column({ nullable: false })
    date: string;

    @ManyToOne(() => Travel, (travel) => travel.days)
    travel: Travel;

    @ManyToMany(() => TimeSlot)
    @JoinTable()
    timeSlots: TimeSlot[]
}
