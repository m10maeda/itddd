import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly service: AppService;

  @Get()
  public getHello(): string {
    return this.service.getHello();
  }
  public constructor(service: AppService) {
    this.service = service;
  }
}
