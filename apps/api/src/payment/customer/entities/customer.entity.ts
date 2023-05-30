import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateCustomerDTO } from "@travel-tailor/types";

import { Timestamp } from "../../../config/utils/timestamp.util";
import { Order } from "../../../payment/order/entities/order.entity";
import { User } from "src/user/entities/user.entity";

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

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    @OneToOne(() => User, user => user.customer)
    user: User;
}
