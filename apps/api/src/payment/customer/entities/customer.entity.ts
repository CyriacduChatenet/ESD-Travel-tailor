import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateCustomerDTO } from "@travel-tailor/types";

import { Timestamp } from "../../../config/utils/timestamp.util";
import { Order } from "../../../payment/order/entities/order.entity";
import { Advertiser } from "../../../user/advertiser/entities/advertiser.entity";
import { Traveler } from "../../../user/traveler/entities/traveler.entity";

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

    @OneToOne(() => Advertiser)
    advertiser: Advertiser;
  
    @OneToOne(() => Traveler)
    traveler: Traveler;
}
