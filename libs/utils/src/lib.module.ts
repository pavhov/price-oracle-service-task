import { Module } from '@nestjs/common';
import { CryptoApiModule } from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/crypto-api.module';

@Module({
  imports: [CryptoApiModule],
  exports: [CryptoApiModule],
})
export class LibModule {}
