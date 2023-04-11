import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeCustomerService } from './stripe-customer.service';
import { CreateStripeCustomerDto } from './dto/create-stripe-customer.dto';
import { UpdateStripeCustomerDto } from './dto/update-stripe-customer.dto';

@Controller('stripe-customer')
export class StripeCustomerController {
  constructor(private readonly stripeCustomerService: StripeCustomerService) {}

  @Post()
  create(@Body() createStripeCustomerDto: CreateStripeCustomerDto) {
    return this.stripeCustomerService.create(createStripeCustomerDto);
  }

  @Get()
  findAll() {
    return this.stripeCustomerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeCustomerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeCustomerDto: UpdateStripeCustomerDto) {
    return this.stripeCustomerService.update(id, updateStripeCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeCustomerService.remove(id);
  }
}
