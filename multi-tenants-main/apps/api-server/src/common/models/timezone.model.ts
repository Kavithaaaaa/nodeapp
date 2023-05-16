import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { TimeZone } from '../../schemas';

@Injectable()
export class TimeZoneModel {
  constructor(
    @InjectModel(TimeZone.name)
    private readonly timeZoneModel: Model<TimeZone>,
  ) {}

  find() {
    return this.timeZoneModel.find();
  }
}
