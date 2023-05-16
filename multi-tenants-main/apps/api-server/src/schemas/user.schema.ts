import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { userStatus } from '../common/enums';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, index: true })
  firstName: string;

  @Prop({ required: true, index: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  phonenumber: string;

  @Prop({ minlength: 5 })
  password: string;

  @Prop({ minlength: 5 })
  ssn: string;

  @Prop({ required: true, default: userStatus['REGISTER'] })
  status: userStatus;

  @Prop({ required: true, default: '1' })
  roles: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', default: null })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    default: null,
  })
  modifiedBy: MongooseSchema.Types.ObjectId;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  modifiedAt: Date;

  @Prop({ default: new Date() })
  lastLoggedIn: Date;

  @Prop({ default: false })
  isLocked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
