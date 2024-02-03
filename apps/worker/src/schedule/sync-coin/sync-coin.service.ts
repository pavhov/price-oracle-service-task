import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { CoingeckoService } from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/coingecko/coingecko.service';
import { InjectModel } from '@nestjs/mongoose';
import { Price } from '@github.com/pavhov/price-oracle-service-task/service/repository/price/price';
import { Model } from 'mongoose';
import { Source } from '@github.com/pavhov/price-oracle-service-task/service/repository/source/source';

@Injectable()
export class SyncCoinService {
  private readonly logger = new Logger(SyncCoinService.name);
  constructor(
    private readonly coingeckoService: CoingeckoService,
    @InjectModel(Price.name) private readonly priceModel: Model<Price>,
    @InjectModel(Source.name) private readonly sourceModel: Model<Source>,
  ) {}

  @Timeout(1000)
  async initialSync() {
    console.log('SyncCoinService');
    await this.syncCoingecko();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async syncCoingecko() {
    this.logger.log('syncCoingecko:coins start');
    const res = await this.coingeckoService.coinsList();
    const coins = res.map((val) => val.id);
    await this.sourceModel.updateOne(
      { source: 'coingecko', key: 'coins' },
      { $set: { source: 'coingecko', key: 'coins', value: coins } },
      { upsert: true },
    );
    this.logger.log('syncCoingecko:coingecko end');
  }
}
