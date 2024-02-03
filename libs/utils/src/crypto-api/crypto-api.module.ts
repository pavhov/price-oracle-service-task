import { Module } from '@nestjs/common';
import { CoingeckoModule } from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/coingecko/coingecko.module';
import { CryptocompareModule } from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/cryptocompare/cryptocompare.module';

@Module({
  imports: [CoingeckoModule, CryptocompareModule],
  exports: [CoingeckoModule, CryptocompareModule],
})
export class CryptoApiModule {}
