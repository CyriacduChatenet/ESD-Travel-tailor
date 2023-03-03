import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { SignupUserInputDTO } from './dto/signup-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(signupUserDto: SignupUserInputDTO): Promise<User> {
    try {
      return await this.userRepository.save(signupUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.traveler', 'traveler')
        .leftJoinAndSelect('user.advertiser', 'advertiser')
        .leftJoinAndSelect('user.resetPasswordToken', 'resetPasswordToken')
        .orderBy('user.createdAt', 'DESC')
        .getMany();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .leftJoinAndSelect('user.traveler', 'traveler')
        .leftJoinAndSelect('user.advertiser', 'advertiser')
        .leftJoinAndSelect('user.resetPasswordToken', 'resetPasswordToken')
        .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, signupUserDto: any) {
    try {
      return await this.userRepository.update(id, signupUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
