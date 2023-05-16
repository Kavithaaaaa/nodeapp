import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { City } from '../../schemas';

@Injectable()
export class CityModel {
  constructor(
    @InjectModel(City.name)
    private readonly cityModel: Model<City>,
  ) {}

  find(id) {
    return this.cityModel.find(
      { ...id, ...{ isActive: true } },
      { __v: 0, isActive: 0 },
    );
  }
}
