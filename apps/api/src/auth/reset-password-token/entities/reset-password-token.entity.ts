import { User } from "../../../user/entities/user.entity";
import { Timestamp } from "../../../utils/timestamp.util";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResetPasswordToken extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @OneToOne(() => User, user => user.resetPasswordToken)
    user: User;
}
