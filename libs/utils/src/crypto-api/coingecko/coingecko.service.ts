import { Injectable } from '@nestjs/common';
import fetch, { RequestInit } from 'node-fetch';
import qs from 'qs';
import ms from 'ms';
import {
  Pair,
  CoinsListRes,
  SimplePrice,
  vsCurrenciesRes,
} from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/coingecko/coingecko.interface';

@Injectable()
export class CoingeckoService {
  private readonly url: string;

  constructor() {
    this.url = 'https://api.coingecko.com/api/v3';
  }

  public async simplePrice(pair: Pair) {
    const params = qs.stringify({
      ids: pair.from,
      vs_currencies: pair.to,
      include_last_updated_at: true,
    });

    return await this.call<SimplePrice>(`simple/price?${params}`, {
      method: 'GET',
    });
  }
  public async simpleVsCurrencies() {
    return await this.call<vsCurrenciesRes>(`simple/supported_vs_currencies`, {
      method: 'GET',
    });
  }
  public async coinsList() {
    const params = qs.stringify({
      include_platform: true,
    });
    return await this.call<CoinsListRes>(`coins/list?${params}`, {
      method: 'GET',
    });
  }

  public async call<R>(uri: string, opts?: RequestInit): Promise<R> {
    const resp = await fetch(`${this.url}/${uri}`, {
      ...opts,
      redirect: 'follow',
      timeout: ms('5s'),
    });

    if (resp.ok) {
      return await resp.json();
    }
    throw new Error(await resp.text());
  }
}
