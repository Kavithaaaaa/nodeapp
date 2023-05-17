import { Injectable } from '@nestjs/common';
import { TimeZoneModel } from '../models/timezone.model';

@Injectable()
export class TimezoneService {
  constructor(private readonly timeZoneModel: TimeZoneModel) {}

  getTimeZoneData() {
    return this.timeZoneModel.find();
  }
}
