import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToOne(() => Activity)
    @JoinColumn()
    activity: Activity

    @ManyToOne(() => Day, (day) => day.timeSlots)
    day: Day
}
