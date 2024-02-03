import { HydratedDocument, SchemaTypes, Model as Model } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type SourceDocument = HydratedDocument<Source>;

@Schema({ timestamps: true, _id: true })
export class Source extends Model {
  @Prop({ type: SchemaTypes.String, index: true })
  source: string;

  @Prop({ type: SchemaTypes.String, index: true })
  key: string;

  @Prop({ type: SchemaTypes.Array })
  value: any[];
}

const SourceSchema = SchemaFactory.createForClass(Source);
SourceSchema.index({ source: 1, key: 1 }, { unique: true });

export { SourceSchema };
