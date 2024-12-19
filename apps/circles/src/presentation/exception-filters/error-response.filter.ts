import {
  ExceptionFilter,
  HttpException,
  Catch,
  type ArgumentsHost,
} from '@nestjs/common';

import { ProblemDetail } from './problem-detail.dto';

import type { Response } from 'express';

@Catch(HttpException)
export class ErrorResponseFilter implements ExceptionFilter<HttpException> {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const detail = new ProblemDetail(exception.message, {
      status,
    });

    response
      .status(status)
      .contentType('application/problem+json')
      .json(detail);
  }
}
