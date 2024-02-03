import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { promisify } from 'util';
import { Model } from 'mongoose';
import { Price } from '@github.com/pavhov/price-oracle-service-task/service/repository/price/price';
import { CoingeckoService } from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/coingecko/coingecko.service';
import { Source } from '@github.com/pavhov/price-oracle-service-task/service/repository/source/source';
import { CryptocompareService } from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/cryptocompare/cryptocompare.service';

@Injectable()
export class SyncPairsService {
  private readonly logger = new Logger(SyncPairsService.name);
  private readonly timeout = promisify(setTimeout);

  constructor(
    private readonly coingeckoService: CoingeckoService,
    private readonly cryptocompareService: CryptocompareService,
    @InjectModel(Price.name) private readonly priceModel: Model<Price>,
    @InjectModel(Source.name) private readonly sourceModel: Model<Source>,
  ) {}

  @Timeout(3000)
  async initialSync() {
    console.log('SyncPairsService');
    await Promise.all([
      // this.syncCoingeckoPrices(),
      // this.syncCryptocomparePrices(),
      this.syncCryptocompareV2cccaggPairs(),
    ]);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async syncCoingeckoPrices() {
    this.logger.log('syncCoingecko:prices start');
    const prices = await this.priceModel.find({ source: 'coingecko' });
    for await (const price of prices) {
      const res = await this.coingeckoService.simplePrice({
        from: price.from,
        to: price.to,
      });
      await price.updateOne({ $set: { price: res[price.from][price.to] } });
      await this.timeout(2000);
    }
    this.logger.log('syncCoingecko:prices end');
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async syncCryptocomparePrices() {
    this.logger.log('syncCryptocomparePrices:prices start');
    const prices = await this.priceModel.find({ source: 'cryptocompare' });
    for await (const price of prices) {
      const [from, to] = [price.from.toUpperCase(), price.to.toUpperCase()];
      const res = await this.cryptocompareService.pricemulti({
        from,
        to,
      });
      if (res[from]) {
        await price.updateOne({ $set: { price: res[from][to] } });
      }
      await this.timeout(2000);
    }
    this.logger.log('syncCryptocomparePrices:prices end');
  }

  @Cron(CronExpression.EVERY_HOUR)
  async syncCryptocompareV2cccaggPairs() {
    this.logger.log('syncCoingecko:coins start');
    const res = await this.cryptocompareService.v2cccaggPairs();
    await this.sourceModel.updateOne(
      { source: 'cryptocompare', key: 'pairs' },
      {
        $set: {
          source: 'cryptocompare',
          key: 'pairs',
          value: Object.keys(res.Data.pairs).map((val) => ({
            fsym: val,
            tsyms: res.Data.pairs[val].tsyms,
          })),
        },
      },
      { upsert: true },
    );
    this.logger.log('syncCoingecko:coingecko end');
  }
}
