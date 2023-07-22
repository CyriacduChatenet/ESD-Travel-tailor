import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { createHmac } from 'crypto'
import { Repository } from 'typeorm'

import { UpdateResetPasswordTokenDto } from './dto/update-reset-password-token.dto'
import { ResetPasswordToken } from './entities/reset-password-token.entity'

@Injectable()
export class ResetPasswordTokenService {
  constructor(
    @InjectRepository(ResetPasswordToken)
    private resetTokenPasswordRepository: Repository<ResetPasswordToken>
  ) {}

  async create(userId: string) {
    try {
      const token = createHmac(
        'sha256',
        `${process.env.JWT_SECRET}`
      ).digest('hex')
      return await this.resetTokenPasswordRepository.save({token, userId})
    } catch (error) {
      throw new BadRequestException({
        message: 'Bad request to create reset password token',
        error,
      })
    }
  }

  async findAll() {
    try {
      return await this.resetTokenPasswordRepository
        .createQueryBuilder('resetPasswordToken')
        .leftJoinAndSelect('resetPasswordToken.user', 'user')
        .orderBy('resetPasswordToken.createdAt', 'DESC')
        .getMany()
    } catch (error) {
      throw new NotFoundException({
        message: 'List of reset password token not found',
        error,
      })
    }
  }

  async findOneByToken(token: string) {
    try {
      return await this.resetTokenPasswordRepository
        .createQueryBuilder('resetPasswordToken')
        .where('resetPasswordToken.token = :token', { token })
        .leftJoinAndSelect('resetPasswordToken.user', 'user')
        .getOne()
    } catch (error) {
      throw new NotFoundException({
        message: `Reset password token not found with token: ${token}`,
        error,
      })
    }
  }

  async update(
    id: string,
    updateResetPasswordTokenDto: UpdateResetPasswordTokenDto
  ) {
    try {
      return await this.resetTokenPasswordRepository.update(
        id,
        updateResetPasswordTokenDto
      )
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update reset password token with id: ${id}`,
        error,
      })
    }
  }

  async remove(id: string) {
    try {
      return await this.resetTokenPasswordRepository.softDelete(id)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to delete reset password token with id: ${id}`,
        error,
      })
    }
  }
}
