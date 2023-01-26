import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { SignupUserInputDTO } from './dto/signup-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(signupUserDto: SignupUserInputDTO): Promise<User> {
    return this.userRepository.save(signupUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  update(id: string, signupUserDto: SignupUserInputDTO): Promise<UpdateResult> {
    return this.userRepository.update(id, signupUserDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.softDelete(id);
  }
}
