import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateResetPasswordTokenDto } from './dto/update-reset-password-token.dto';
import { ResetPasswordToken } from './entities/reset-password-token.entity';

@Injectable()
export class ResetPasswordTokenService {
  constructor(
    @InjectRepository(ResetPasswordToken)
    private resetPasswordTokenRepository: Repository<ResetPasswordToken>,
    private jwtService: JwtService,
  ) {}

  async create(userId: string) {
    try {
      const payload = {
        user: userId,
      };
      const token = this.jwtService.sign(payload);
      const tokenReplace = token.replace(/\./g, '');
      return await this.resetPasswordTokenRepository.save({
        token: tokenReplace,
      });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll() {
    try {
      return await this.resetPasswordTokenRepository
        .createQueryBuilder('resetPasswordToken')
        .leftJoinAndSelect('resetPasswordToken.user', 'user')
        .orderBy('resetPasswordToken.createdAt', 'DESC')
        .getMany();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(token: string) {
    try {
      return await this.resetPasswordTokenRepository
        .createQueryBuilder('resetPasswordToken')
        .leftJoinAndSelect('resetPasswordToken.user', 'user')
        .where('resetPasswordToken.token = :token', { token })
        .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(
    id: string,
    updateResetPasswordTokenDto: UpdateResetPasswordTokenDto,
  ) {
    try {
      return this.resetPasswordTokenRepository.update(
        id,
        updateResetPasswordTokenDto,
      );
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return this.resetPasswordTokenRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
