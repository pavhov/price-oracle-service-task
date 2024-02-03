import { NestFactory } from '@nestjs/core';
import path from 'path';
import dotenv from 'dotenv';
import process from 'process';
import { rateLimit } from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@github.com/pavhov/price-oracle-service-task/price-oracle/app.module';
import { ValidationPipe } from '@github.com/pavhov/price-oracle-service-task/service/pipe/validation.pipe';
import { UrlParserInspector } from '@github.com/pavhov/price-oracle-service-task/service/inspector/url-parser.inspector';
import { HttpExceptionFilter } from '@github.com/pavhov/price-oracle-service-task/service/filter/http-exception.filter';
import { MongoExceptionFilter } from '@github.com/pavhov/price-oracle-service-task/service/filter/mongo-server-error.filter';
import { AssertionErrorFilter } from '@github.com/pavhov/price-oracle-service-task/service/filter/assertion-error.filter';

async function bootstrap() {
  const conf = path.resolve(process.cwd(), 'config', `.env`);
  dotenv.config({ path: conf });
  const app = await NestFactory.create(AppModule);
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minute
      limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
      standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new UrlParserInspector());
  app.useGlobalFilters(new AssertionErrorFilter());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Doc')
    .setVersion('2.0')
    .addTag('doc');
  options.addServer(process.env.SWAGGER_SERVER);
  const document = SwaggerModule.createDocument(app, options.build());
  await SwaggerModule.setup(`/doc`, app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
