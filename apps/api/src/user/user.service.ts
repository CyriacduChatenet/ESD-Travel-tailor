import {
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
      throw new UnauthorizedException(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        relations: {
          traveler: true,
          advertiser: true,
          resetPasswordToken: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { email },
        relations: ['traveler', 'advertiser', 'resetPasswordToken'],
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(email: string, signupUserDto: any) {
    try {
      return await this.userRepository.update(email, signupUserDto);
    } catch (error) {
      throw new UnauthorizedException(error);
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
