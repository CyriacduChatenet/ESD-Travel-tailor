import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Timestamp } from "../../../config/utils/timestamp.util";
import { Comment } from "../../entities/comment.entity";

@Entity()
export class CommentMark extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { default: 0, precision: 3, scale: 1, nullable: false })
    global: number;

    @Column({ nullable: false })
    rentability: number;

    @Column({ nullable: false })
    place: number;

    @Column({ nullable: false })
    waiting: number;

    @Column({ nullable: false })
    explanation: number;

    @Column({ nullable: false })
    arrival: number;

    @OneToOne(() => Comment, (comment) => comment.marks)
    comment: Comment;
}
