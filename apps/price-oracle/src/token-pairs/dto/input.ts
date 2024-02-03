import * as sw from '@nestjs/swagger';
import { decorator } from '@github.com/pavhov/price-oracle-service-task/service/decorator';

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    from: {
      type: 'string',
    },
    to: {
      type: 'string',
    },
    source: {
      type: 'string',
      enum: ['coingecko', 'cryptocompare'],
    },
  },
})
export class FilterInput {
  @sw.ApiProperty({ required: false })
  declare from: string;
  @sw.ApiProperty({ required: false })
  declare to: string;
  @sw.ApiProperty({ required: false })
  declare source: string;
}

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'FilterInput',
  required: ['source'],
})
export class UpdateInput extends FilterInput {
  @sw.ApiProperty({ required: false })
  declare from: string;
  @sw.ApiProperty({ required: false })
  declare to: string;
  @sw.ApiProperty({ required: false })
  declare source: string;
}

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'UpdateInput',
  required: ['from', 'to', 'source'],
})
export class CreateInput extends UpdateInput {
  @sw.ApiProperty({ required: true })
  declare from: string;
  @sw.ApiProperty({ required: true })
  declare to: string;
  @sw.ApiProperty({ required: true })
  declare source: string;
}
