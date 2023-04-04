import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../../../../../config/utils/timestamp.util";
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

    @ManyToOne(() => Day, (day) => day.timeSlots)
    day: Day

    @ManyToOne(() => Activity, (activity) => activity.timeSlots)
    activity: Activity

}
