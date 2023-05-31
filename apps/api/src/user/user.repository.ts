import { DataSource, DeleteResult, Repository } from "typeorm";
import { ApiLimitResourceQuery, UpdateUserDTO } from "@travel-tailor/types";

import { User } from "./entities/user.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { SignupUserInputDTO } from "./dto/signup-user.dto";

export class UserRepository extends Repository<User> {
    constructor(@InjectDataSource() datasource: DataSource) {
        super(User, datasource.createEntityManager());
    }

    async createUser(signupUserDto: SignupUserInputDTO): Promise<User> {
        const user = this.create({...signupUserDto} as User);
        return await this.save(user);
      }

    async saveUser(user: User) {
        return await this.save(user)
    }
    
      async findAllUser(queries: ApiLimitResourceQuery) {
          let { page, limit, sortedBy, username, email, roles } = queries;
          page = page ? +page : 1;
          limit = limit ? +limit : 10;
    
          const query = this.createQueryBuilder('user')
            .leftJoinAndSelect('user.traveler', 'traveler')
            .leftJoinAndSelect('traveler.tastes', 'tastes')
            .leftJoinAndSelect('traveler.travels', 'travels')
            .leftJoinAndSelect('user.customer', 'customer')
            .leftJoinAndSelect('user.advertiser', 'advertiser')
            .leftJoinAndSelect('user.resetPasswordToken', 'resetPasswordToken')
    
          if (sortedBy) {
            query.orderBy('user.createdAt', sortedBy)
          } else {
            query.orderBy('user.createdAt', 'DESC')
          }
    
          if (username) {
            query.andWhere('user.username LIKE :username', { username })
          }
    
          if (email) {
            query.andWhere('user.email LIKE :email', { email })
          }
    
          if (roles) {
            query.andWhere('user.roles = :roles', { roles })
          }
          
            return {
              page: page,
              limit: limit,
              total: await query.getCount(),
              data: await query.skip((page - 1) * limit).take(limit).getMany()
            }
      }
    
      async findOneUserByEmail(email: string): Promise<User> {
          return await this.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .leftJoinAndSelect('user.traveler', 'traveler')
            .leftJoinAndSelect('traveler.travels', 'travels')
            .leftJoinAndSelect('traveler.tastes', 'tastes')
            .leftJoinAndSelect('user.advertiser', 'advertiser')
            .leftJoinAndSelect('advertiser.activities', 'activities')
            .leftJoinAndSelect('user.resetPasswordToken', 'resetPasswordToken')
            .getOne()
      }
    
      async updateUser(id: string, signupUserDto: UpdateUserDTO | unknown) {
          return await this.update(id, signupUserDto)
      }
    
      async removeUser(id: string): Promise<DeleteResult> {
          return await this.softDelete(id)
      }
}