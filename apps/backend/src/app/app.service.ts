import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this
  public getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }
}
