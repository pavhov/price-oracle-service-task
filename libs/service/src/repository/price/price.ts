import { HydratedDocument, SchemaTypes, Model as Model } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type PriceDocument = HydratedDocument<Price>;

@Schema({ timestamps: true, _id: true })
export class Price extends Model {
  @Prop({ type: SchemaTypes.String, index: true })
  from: string;

  @Prop({ type: SchemaTypes.String, index: true })
  to: string;

  @Prop({ type: SchemaTypes.Number })
  price: number;

  @Prop({ type: SchemaTypes.String, index: true })
  source: string;
}

const PriceSchema = SchemaFactory.createForClass(Price);
PriceSchema.index({ from: 1, to: 1, source: 1 }, { unique: true });

export { PriceSchema };
