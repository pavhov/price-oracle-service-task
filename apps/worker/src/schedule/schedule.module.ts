import { Module } from '@nestjs/common';
import { SyncCoinService } from './sync-coin/sync-coin.service';
import { SyncCurrencyService } from './sync-currency/sync-currency.service';
import { ScheduleModule as CommonScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import { LibModule } from '@github.com/pavhov/price-oracle-service-task/utils';
import { SyncPairsService } from './sync-pairs/sync-pairs.service';

@Module({
  imports: [CommonScheduleModule.forRoot(), LibModule],
  providers: [SyncCoinService, SyncCurrencyService, SyncPairsService],
})
export class ScheduleModule {}
