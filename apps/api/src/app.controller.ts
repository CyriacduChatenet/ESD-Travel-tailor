import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { AppService } from './app.service';
import { HeaderInterceptor } from './auth/interceptor/header.interceptor';

@Controller()
@UseInterceptors(HeaderInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
