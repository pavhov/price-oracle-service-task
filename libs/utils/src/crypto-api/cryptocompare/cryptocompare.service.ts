import { Injectable } from '@nestjs/common';
import fetch, { RequestInit } from 'node-fetch';
import ms from 'ms';
import {
  CCCAGGConstituentPairs,
  SymbolPrice,
} from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/cryptocompare/cryptocompare.interface';
import * as process from 'process';
import qs from 'qs';
import { Pair } from '@github.com/pavhov/price-oracle-service-task/utils/crypto-api/coingecko/coingecko.interface';

@Injectable()
export class CryptocompareService {
  private readonly url: string;
  private readonly token: string;

  constructor() {
    this.url = 'https://min-api.cryptocompare.com/data';
    this.token = process.env.cryptocompare_token;
  }

  public async pricemulti(pair: Pair) {
    const params = qs.stringify({
      fsyms: pair.from.toUpperCase(),
      tsyms: pair.to.toUpperCase(),
    });

    return await this.call<SymbolPrice>(`pricemulti?${params}`, {
      method: 'GET',
    });
  }
  public async v2cccaggPairs() {
    return await this.call<CCCAGGConstituentPairs>('v2/cccagg/pairs', {
      method: 'GET',
    });
  }

  public async call<R>(uri: string, opts?: RequestInit): Promise<R> {
    const resp = await fetch(`${this.url}/${uri}`, {
      ...opts,
      redirect: 'follow',
      timeout: ms('5s'),
      headers: { authorization: this.token },
    });

    if (resp.ok) {
      return await resp.json();
    }
    throw new Error(await resp.text());
  }
}
