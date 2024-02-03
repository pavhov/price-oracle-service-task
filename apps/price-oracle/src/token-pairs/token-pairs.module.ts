import { Module } from '@nestjs/common';
import { TokenPairsController } from '@github.com/pavhov/price-oracle-service-task/price-oracle/token-pairs/token-pairs.controller';
import { TokenPairsService } from '@github.com/pavhov/price-oracle-service-task/price-oracle/token-pairs/token-pairs.service';

@Module({
  controllers: [TokenPairsController],
  providers: [TokenPairsService],
})
export class TokenPairsModule {}
