import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../../config/utils/timestamp.util";
import { Activity } from "../../../activity/entities/activity.entity";

@Entity()
export class ActivityMark extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { default: 0, precision: 3, scale: 1, nullable: false })
    global: number;

    @Column('decimal', { default: 0, precision: 3, scale: 1, nullable: false })
    rentability: number;

    @Column('decimal', { default: 0, precision: 3, scale: 1, nullable: false })
    place: number;

    @Column('decimal', { default: 0, precision: 3, scale: 1, nullable: false })
    waiting: number;

    @Column('decimal', { default: 0, precision: 3, scale: 1, nullable: false })
    explanation: number;

    @Column('decimal', { default: 0, precision: 3, scale: 1, nullable: false })
    arrival: number;

    @OneToOne(() => Activity, (activity) => activity.marks)
    activity: Activity;
}
