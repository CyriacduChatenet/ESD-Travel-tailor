import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../../../../../utils/timestamp.util";
import { Activity } from "../../../../../../activity/entities/activity.entity";
import { Day } from "../../entities/day.entity";

@Entity()
export class TimeSlot extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;

    @OneToOne(() => Activity)
    @JoinColumn()
    activity: Activity
    
    @ManyToMany(() => Day, day => day.timeSlots)
    @JoinTable()
    days: Day[];
}
