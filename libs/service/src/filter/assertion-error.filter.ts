import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { AssertionError } from 'assert';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch(AssertionError)
export class AssertionErrorFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json({
      statusCode: 400,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
