import { Module } from '@nestjs/common';
import { CoingeckoService } from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/coingecko/coingecko.service';

@Module({
  providers: [CoingeckoService],
  exports: [CoingeckoService],
})
export class CoingeckoModule {}
