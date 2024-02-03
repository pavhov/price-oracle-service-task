import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import assert from 'assert';
import { Model, Types } from 'mongoose';
import { Price } from '@github.com/pavhov/price-oracle-service-task/service/repository/price/price';
import { DetailOutput } from '@github.com/pavhov/price-oracle-service-task/price-oracle/token-pairs/dto/output';
import * as dto from '@github.com/pavhov/price-oracle-service-task/price-oracle/token-pairs/dto/input';
import { Source } from '@github.com/pavhov/price-oracle-service-task/service/repository/source/source';

@Injectable()
export class TokenPairsService {
  validateSources: Record<string, any>;

  constructor(
    @InjectModel(Price.name) private readonly priceModel: Model<Price>,
    @InjectModel(Source.name) private readonly sourceModel: Model<Source>,
  ) {
    this.validateSources = {
      coingecko: this.validateCoingecko.bind(this),
      cryptocompare: this.validateCryptocompare.bind(this),
    };
  }

  public async create(data: dto.CreateInput): Promise<DetailOutput> {
    await this.validateSources[data.source](data);
    return this.priceModel.create(data);
  }
  public async findAll(data: dto.FilterInput): Promise<DetailOutput[]> {
    return this.priceModel.find(data);
  }
  public async findOne(id: Types.ObjectId): Promise<DetailOutput> {
    return this.priceModel.findOne({ _id: id });
  }
  public async update(
    id: Types.ObjectId,
    data: dto.UpdateInput,
  ): Promise<DetailOutput> {
    await this.validateSources[data.source](data);
    return this.priceModel.updateOne({ _id: id }, { $set: data });
  }
  public async remove(id: Types.ObjectId): Promise<DetailOutput> {
    return this.priceModel.deleteOne({ _id: id });
  }

  private async validateCoingecko(data: dto.UpdateInput) {
    data.from &&
      assert(
        await this.sourceModel.findOne({
          source: data.source,
          key: 'coins',
          value: { $in: data.from },
        }),
        `'${data.from}' coin not found from '${data.source}' datasource`,
      );
    data.to &&
      assert(
        await this.sourceModel.findOne({
          source: data.source,
          key: 'currencies',
          value: { $in: data.to },
        }),
        `'${data.to}' currency not found from '${data.source}' datasource`,
      );
  }
  private async validateCryptocompare(data: dto.UpdateInput) {
    data.from &&
      assert(
        await this.sourceModel.findOne({
          source: data.source,
          key: 'pairs',
          'value.fsym': data.from.toUpperCase(),
        }),
        `'${data.from}' coin not found from '${data.source}' datasource`,
      );
  }
}
