import { Injectable } from '@nestjs/common';
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
    const payload = {
      user: userId,
    };
    const token = this.jwtService.sign(payload);
    const tokenReplace = token.replace(/\./g, '');
    return await this.resetPasswordTokenRepository.save({
      token: tokenReplace,
    });
  }

  async findAll() {
    return await this.resetPasswordTokenRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(token: string) {
    return await this.resetPasswordTokenRepository.findOne({
      where: { token },
      relations: {
        user: true,
      },
    });
  }

  async update(
    id: string,
    updateResetPasswordTokenDto: UpdateResetPasswordTokenDto,
  ) {
    return this.resetPasswordTokenRepository.update(
      id,
      updateResetPasswordTokenDto,
    );
  }

  async remove(id: string) {
    return `This action removes a #${id} resetPasswordToken`;
  }
}
