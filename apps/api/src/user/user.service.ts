import { Injectable } from '@nestjs/common';
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
    return await this.userRepository.save(signupUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        traveler: true,
        advertiser: true,
        resetPasswordToken: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['traveler', 'advertiser', 'resetPasswordToken'],
    });
  }

  async update(email: string, signupUserDto: any) {
    const userInDB: any = await this.findOneByEmail(email);
    userInDB.tastes = [signupUserDto.tastes];
    userInDB.user = signupUserDto.user;
    return await this.userRepository.save(userInDB);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.softDelete(id);
  }
}
