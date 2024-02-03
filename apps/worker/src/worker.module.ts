import { Module } from '@nestjs/common';
import { ScheduleModule } from '@github.com/pavhov/price-oracle-service-task/worker/schedule/schedule.module';
import { ServiceModule } from '@github.com/pavhov/price-oracle-service-task/service';

@Module({
  imports: [ServiceModule, ScheduleModule],
})
export class WorkerModule {}
