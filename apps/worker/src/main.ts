import { NestFactory } from '@nestjs/core';
import { WorkerModule } from '@github.com/pavhov/price-oracle-service-task/worker//worker.module';
import path from 'path';
import process from 'process';
import dotenv from 'dotenv';

async function bootstrap() {
  const conf = path.resolve(process.cwd(), 'config', `.env`);
  dotenv.config({ path: conf });

  const app = await NestFactory.create(WorkerModule);
  await app.listen(null);
}
bootstrap();
