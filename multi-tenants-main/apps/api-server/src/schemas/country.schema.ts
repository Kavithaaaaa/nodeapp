import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type CountryDocument = HydratedDocument<Country>;

@Schema({ collection: 'countries' })
export class Country {
  _id: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  sortname: string;

  @Prop({ required: true })
  name: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'State' }])
  states: MongooseSchema.Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
