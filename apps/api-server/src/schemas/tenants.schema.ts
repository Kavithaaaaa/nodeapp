import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type TenantsDocument = HydratedDocument<Tenants>;

@Schema({ collection: 'tenants' })
export class Tenants {
  _id: string;

  @Prop({ required: false })
  type: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  contactNumber: number;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  state: string;

  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  zipCode: number;

  @Prop({ required: false })
  timeZone: string;

  @Prop({ required: false })
  domainName: string;

  @Prop({ required: false })
  databaseName: string;

  @Prop({ required: false })
  clientLogo: string;

  @Prop({ required: false })
  accentColor: string;

  @Prop({ required: false })
  programs: string[];

  @Prop({ required: false })
  additionalFeature: string[];

  @Prop({ required: false })
  createdBy: number;

  @Prop({ default: 0 })
  modifiedBy: number;

  @Prop({ default: Date.now })
  createdAt: string;

  @Prop({ default: Date.now })
  modifiedAt: string;

  @Prop({ default: false })
  isDelete: boolean;

  @Prop({ default: false })
  isArchive: boolean;

  @Prop()
  stateRegion: string;
}

export const TenantsSchema = SchemaFactory.createForClass(Tenants);
