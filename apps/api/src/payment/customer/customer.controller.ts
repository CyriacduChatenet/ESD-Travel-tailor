import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
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
@ApiTags('Customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @Throttle(1000, 60)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiCreatedResponse({ description: 'Customer created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @Get()
  @ApiCreatedResponse({ description: 'Customers found successfully' })
  @ApiBadRequestResponse({ description: 'Invalid customer ID' })
  @Throttle(1000, 60)// Assuming you have defined this decorator to document the query parameters
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.customerService.findAll(queries);
  }

  @Get(':id')
  @Throttle(1000, 60)
  @ApiCreatedResponse({ description: 'Customer found successfully' })
  @ApiBadRequestResponse({ description: 'Invalid customer ID' })
  async findOne(@Param('id') id: string) {
    return await this.customerService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiCreatedResponse({ description: 'Customer updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data or customer ID' })
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return await this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiCreatedResponse({ description: 'Customer deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid customer ID' })
  async remove(@Param('id') id: string) {
    return await this.customerService.remove(id);
  }
}
