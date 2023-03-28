import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../../utils/timestamp.util";

@Entity()
export class Customer extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    address: string;
}
