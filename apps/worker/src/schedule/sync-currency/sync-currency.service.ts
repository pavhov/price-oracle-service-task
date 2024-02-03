import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Price } from '@github.com/pavhov/price-oracle-service-task/service/repository/price/price';
import { Source } from '@github.com/pavhov/price-oracle-service-task/service/repository/source/source';
import { CoingeckoService } from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/coingecko/coingecko.service';

@Injectable()
export class SyncCurrencyService {
  private readonly logger = new Logger(SyncCurrencyService.name);
  constructor(
    private readonly coingeckoService: CoingeckoService,
    @InjectModel(Price.name) private readonly priceModel: Model<Price>,
    @InjectModel(Source.name) private readonly sourceModel: Model<Source>,
  ) {}

  @Timeout(1000)
  async initialSync() {
    console.log('SyncCurrencyService');
    await this.syncCoingecko();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async syncCoingecko() {
    this.logger.log('syncCoingecko:coingecko start');
    const currencies = await this.coingeckoService.simpleVsCurrencies();
    await this.sourceModel.updateOne(
      { source: 'coingecko', key: 'currencies' },
      { $set: { source: 'coingecko', key: 'currencies', value: currencies } },
      { upsert: true },
    );
    this.logger.log('syncCoingecko:coingecko end');
  }
}
