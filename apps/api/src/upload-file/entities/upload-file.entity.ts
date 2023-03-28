import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { Timestamp } from "../../utils/timestamp.util";

@Entity()
export class UploadFile extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        nullable: true,
    })
    ETag: string;

    @Column()
    Location: string;

    @Column({
        nullable: true,
    })
    key: string;

    @Column({
        nullable: true,
    })
    Key: string;

    @Column({
        nullable: true,
    })
    Bucket: string;
}