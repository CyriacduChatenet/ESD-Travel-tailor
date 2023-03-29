import { CreateOrderDTO } from "@travel-tailor/types";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Customer } from "../../../payment/customer/entities/customer.entity";
import { Timestamp } from "../../../utils/timestamp.util";

@Entity()
export class Order extends Timestamp implements CreateOrderDTO {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;
}
