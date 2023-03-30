import { CreateOrderDTO } from "@travel-tailor/types";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Customer } from "../../../payment/customer/entities/customer.entity";
import { Timestamp } from "../../../utils/timestamp.util";

@Entity()
export class Order extends Timestamp implements CreateOrderDTO {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 0, nullable: false })
    amount: number;

    @Column({ nullable: false })
    payment_id: string;

    @Column({ nullable: false })
    capture_method: string;

    @Column({ nullable: false })
    client_secret: string;

    @Column({ nullable: false })
    confirmation_method: string;

    @Column({ default: 0, nullable: false })
    payment_created_at: number;

    @Column({ default: 'eur', nullable: false })
    currency: string;

    @Column({ nullable: false })
    paymentMethodTypes: string;

    @Column({ default: 'pending', nullable: false })
    status: string;
    
    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;
}
