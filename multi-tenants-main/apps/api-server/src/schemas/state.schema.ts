import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
  Schema as MongooseSchema,
  Document,
  HydratedDocument,
} from 'mongoose';

export type StateDocument = HydratedDocument<State>;

@Schema({ collection: 'states' })
export class State {
  _id: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'City' }])
  cities: MongooseSchema.Types.ObjectId;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Country' }])
  country: MongooseSchema.Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const StateSchema = SchemaFactory.createForClass(State);
