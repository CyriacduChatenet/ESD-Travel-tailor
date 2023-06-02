import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateCustomerDTO } from "@travel-tailor/types";

import { Timestamp } from "../../../config/utils/timestamp.util";
import { User } from "../../../user/entities/user.entity";

@Entity()
export class Customer extends Timestamp implements CreateCustomerDTO {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: false })
    stripeId: string;

    @OneToOne(() => User, user => user.customer)
    user: User;
}
