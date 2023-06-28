import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this
  public getHello(): string {
    return 'Hello World!';
  }
}
