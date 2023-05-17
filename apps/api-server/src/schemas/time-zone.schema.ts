import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TimeZoneDocument = HydratedDocument<TimeZone>;

@Schema({ collection: 'timezone' })
export class TimeZone {
  _id: string;
  @Prop({ required: true })
  'value': string;

  @Prop({ required: true })
  'abbr': string;

  @Prop({ required: true })
  'offset': string;

  @Prop({ required: true })
  'isdst': boolean;

  @Prop({ required: true })
  'text': string;

  @Prop({ required: true })
  'utc': string[];
}

export const TimeZoneSchema = SchemaFactory.createForClass(TimeZone);
