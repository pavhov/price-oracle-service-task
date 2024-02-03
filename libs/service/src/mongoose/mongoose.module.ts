import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule as CommonMongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { RepositoryModule } from '@github.com/pavhov/price-oracle-service-task/service/repository/repository.module';

@Module({})
export class MongooseModule {
  static register(): DynamicModule {
    return {
      module: MongooseModule,
      imports: [
        CommonMongooseModule.forRootAsync({
          useFactory: () => {
            mongoose.set('debug', true);
            return { uri: process.env.MONGO_URL, dbName: process.env.MONGO_DB };
          },
        }),
        RepositoryModule,
      ],
      exports: [RepositoryModule],
    };
  }
}
