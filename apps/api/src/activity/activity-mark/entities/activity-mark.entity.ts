import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../../config/utils/timestamp.util";
import { Activity } from "src/activity/entities/activity.entity";

@Entity()
export class ActivityMark extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { default: 0, precision: 3, scale: 1, nullable: false })
    global: number;

    @Column({ nullable: false, default: 0 })
    rentability: number;

    @Column({ nullable: false, default: 0 })
    place: number;

    @Column({ nullable: false, default: 0 })
    waiting: number;

    @Column({ nullable: false, default: 0 })
    explanation: number;

    @Column({ nullable: false, default: 0 })
    arrival: number;

    @OneToOne(() => Activity, (activity) => activity.marks)
    activity: Activity;
}
