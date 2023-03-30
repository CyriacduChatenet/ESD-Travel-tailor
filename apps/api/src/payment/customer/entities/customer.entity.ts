import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateCustomerDTO } from "@travel-tailor/types";

import { Timestamp } from "../../../utils/timestamp.util";
import { Order } from "../../../payment/order/entities/order.entity";
import { Advertiser } from "../../../user/advertiser/entities/advertiser.entity";
import { Traveler } from "../../../user/traveler/entities/traveler.entity";

@Entity()
export class Customer extends Timestamp implements CreateCustomerDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: false })
    stripeId: string;

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    @OneToOne(() => Advertiser)
    @JoinColumn()
    advertiser: Advertiser;
  
    @OneToOne(() => Traveler)
    @JoinColumn()
    traveler: Traveler;
}
