import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Roles } from '../../config/decorators/roles.decorator';
import { Role } from '../../config/enum/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('customer')
@UseGuards(ThrottlerGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @Throttle(500, 60)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @Get()
  @Throttle(500, 60)
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.customerService.findAll(queries);
  }

  @Get(':id')
  @Throttle(500, 60)
  async findOne(@Param('id') id: string) {
    return await this.customerService.findOne(id);
  }

  @Patch(':id')
  @Throttle(500, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return await this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @Throttle(500, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.customerService.remove(id);
  }
}
