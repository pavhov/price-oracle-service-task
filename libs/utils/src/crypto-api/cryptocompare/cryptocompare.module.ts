import { Module } from '@nestjs/common';
import { CryptocompareService } from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/cryptocompare/cryptocompare.service';

@Module({
  providers: [CryptocompareService],
  exports: [CryptocompareService],
})
export class CryptocompareModule {}
