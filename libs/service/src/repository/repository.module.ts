import { Global, Module } from '@nestjs/common';
import { MongooseModule as CommonMongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import {
  Price,
  PriceSchema,
} from '@github.com/pavhov/price-oracle-service-task/service/repository/price/price';
import {
  Source,
  SourceSchema,
} from '@github.com/pavhov/price-oracle-service-task/service/repository/source/source';

const schemas = [
  CommonMongooseModule.forFeature([
    { name: Price.name, schema: PriceSchema, collection: 'price' },
  ]),
  CommonMongooseModule.forFeature([
    { name: Source.name, schema: SourceSchema, collection: 'source' },
  ]),
];
@Global()
@Module({
  imports: [...schemas],
  exports: [...schemas],
})
export class RepositoryModule {}
