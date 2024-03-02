import {
  ExceptionFilter,
  HttpException,
  type ArgumentsHost,
  Catch,
} from '@nestjs/common';

import { ProbremDetail } from './probrem-detail.dto';

import type { Response } from 'express';

@Catch(HttpException)
export class ProbremDetailFilter implements ExceptionFilter<HttpException> {
  // eslint-disable-next-line class-methods-use-this
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const probremDetail = new ProbremDetail(exception.message, {
      status: exception.getStatus(),
    });

    response
      .status(status)
      .contentType('application/problem+json')
      .json(probremDetail);
  }
}
