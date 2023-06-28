import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  public constructor(private readonly appService: AppService) {}
}
