import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { StripeCustomerService } from './stripe-customer.service';
import { CreateStripeCustomerDto } from './dto/create-stripe-customer.dto';
import { UpdateStripeCustomerDto } from './dto/update-stripe-customer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from '../../config/enum/role.enum';
import { Roles } from '../../config/decorators/roles.decorator';

@Controller('stripe-customer')
export class StripeCustomerController {
  constructor(private readonly stripeCustomerService: StripeCustomerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  create(@Body() createStripeCustomerDto: CreateStripeCustomerDto) {
    return this.stripeCustomerService.create(createStripeCustomerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  findAll() {
    return this.stripeCustomerService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.stripeCustomerService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateStripeCustomerDto: UpdateStripeCustomerDto) {
    return this.stripeCustomerService.update(id, updateStripeCustomerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.stripeCustomerService.remove(id);
  }
}
