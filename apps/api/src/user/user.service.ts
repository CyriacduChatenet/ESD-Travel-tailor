import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ApiLimitResourceQuery } from '@travel-tailor/types'
import { DeleteResult, Repository } from 'typeorm'

import { SignupUserInputDTO } from './dto/signup-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { testEmailUtil } from '../utils/regex-test-email.util'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  async create(signupUserDto: SignupUserInputDTO): Promise<User> {
    try {
      if(testEmailUtil(signupUserDto.email)) {
        return await this.userRepository.save(signupUserDto)
      } else {
        throw new BadRequestException('email must contain ***@***.***')
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit, sortedBy, username, email, roles } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      const query = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.traveler', 'traveler')
        .leftJoinAndSelect('traveler.tastes', 'tastes')
        .leftJoinAndSelect('traveler.travels', 'travels')
        .leftJoinAndSelect('traveler.customer', 'customer')
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
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  public async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .leftJoinAndSelect('user.traveler', 'traveler')
        .leftJoinAndSelect('traveler.travels', 'travels')
        .leftJoinAndSelect('traveler.tastes', 'tastes')
        .leftJoinAndSelect('user.advertiser', 'advertiser')
        .leftJoinAndSelect('user.resetPasswordToken', 'resetPasswordToken')
        .getOne()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, signupUserDto: UpdateUserDTO | unknown) {
    try {
      return await this.userRepository.update(id, signupUserDto)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.softDelete(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
