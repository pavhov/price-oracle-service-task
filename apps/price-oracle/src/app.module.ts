import { Module } from '@nestjs/common';
import { LibModule } from '@github.com/pavhov/price-oracle-service-task/utils';
import { ServiceModule } from '@github.com/pavhov/price-oracle-service-task/service';
import { AppController } from '@github.com/pavhov/price-oracle-service-task/price-oracle/app.controller';
import { AppService } from '@github.com/pavhov/price-oracle-service-task/price-oracle/app.service';
import { TokenPairsModule } from '@github.com/pavhov/price-oracle-service-task/price-oracle/token-pairs/token-pairs.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ServiceModule,
    LibModule,
    TerminusModule,
    TokenPairsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
