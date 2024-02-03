import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message = exception.message.split(' ');
    message.splice(0, 1);
    response.status(400).json({
      statusCode: 400,
      message: message.join(' '),
      timestamp: new Date().toISOString(),
    });
  }
}
