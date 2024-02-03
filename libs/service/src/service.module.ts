import { Module } from '@nestjs/common';
import { MongooseModule } from '@github.com/pavhov/price-oracle-service-task/service/mongoose/mongoose.module';

const modules = [MongooseModule.register()];
@Module({
  imports: modules,
  providers: [],
  exports: modules,
})
export class ServiceModule {}
