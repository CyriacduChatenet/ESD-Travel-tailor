import { Entity, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../../../../../utils/timestamp.util";

@Entity()
export class TimeSlot extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}
