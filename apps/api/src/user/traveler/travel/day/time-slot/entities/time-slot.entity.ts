import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../../../../../utils/timestamp.util";
import { Activity } from "../../../../../../activity/entities/activity.entity";
import { Day } from "../../entities/day.entity";

@Entity()
export class TimeSlot extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Activity)
    @JoinColumn()
    activity: Activity
    
    @ManyToMany(() => Day, day => day.timeSlots)
    @JoinTable()
    days: Day[];
}
