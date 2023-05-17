import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CityDocument = HydratedDocument<City>;

@Schema({ collection: 'cities' })
export class City {
  _id: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: false })
  name: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Country' }])
  state: MongooseSchema.Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const CitySchema = SchemaFactory.createForClass(City);
