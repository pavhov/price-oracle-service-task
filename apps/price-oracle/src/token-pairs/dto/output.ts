import { decorator } from 'libs/service/src/decorator';

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    pair: { type: 'string' },
    from: { type: 'string' },
    to: { type: 'string' },
    price: { type: 'number' },
    updated: { type: 'string' },
  },
  required: ['pair', 'from', 'to', 'price', 'updated'],
})
export class DetailOutput {}
