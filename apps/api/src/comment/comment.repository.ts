import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ApiLimitResourceQuery } from "@travel-tailor/types";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentMark } from "../comment/comment-mark/entities/comment-mark.entity";

export class CommentRepository extends Repository<Comment> {
    constructor(@InjectDataSource() datasource: DataSource) {
        super(Comment, datasource.createEntityManager());
    }

    async createComment(createCommentDto: CreateCommentDto, commentMarks: CommentMark) {
        const comment = this.create({...createCommentDto, marks: commentMarks});
        return await this.save(comment)
    }

    async findAllComment(queries: ApiLimitResourceQuery) {
        let { page, limit, sortedBy, author } = queries;
        page = page ? +page : 1;
        limit = limit ? +limit : 10;

        const query = this.createQueryBuilder('comment')
            .leftJoinAndSelect('comment.traveler', 'traveler')
            .leftJoinAndSelect('traveler.user', 'user')
            .leftJoinAndSelect('comment.activity', 'activity')
            .leftJoinAndSelect('comment.marks', 'commentMark')

        if (sortedBy) {
            query.orderBy('comment.createdAt', sortedBy);
        } else {
            query.orderBy('comment.createdAt', 'DESC');
        }

        if (author) {
            query.where('user.username = :author', { author });
        }

        return {
            page: page,
            limit: limit,
            total: await query.getCount(),
            data: await query.skip((page - 1) * limit).take(limit).getMany()
        }
    }

    async findOneComment(id: string) {
        return await this.createQueryBuilder('comment')
            .where('comment.id = :id', { id })
            .leftJoinAndSelect('comment.traveler', 'traveler')
            .leftJoinAndSelect('comment.activity', 'activity')
            .leftJoinAndSelect('comment.marks', 'commentMark')
            .getOne()
    }

    async updateComment(id: string, updateCommentDto: UpdateCommentDto) {
            return this.update(id, updateCommentDto)
    }

    async removeComment(id: string) {
            return await this.softDelete(id)
    }
}