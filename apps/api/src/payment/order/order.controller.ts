import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from '../../config/decorators/roles.decorator';
import { Role } from '../../config/enum/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('order')
@UseGuards(ThrottlerGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Throttle(20, 60)
  @Roles(Role.Advertiser, Role.Admin)
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  @Throttle(20, 60)
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.orderService.findAll(queries);
  }

  @Get(':id')
  @Throttle(20, 60)
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @Patch(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
