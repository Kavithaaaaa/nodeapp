import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Country } from '../../schemas';

@Injectable()
export class CountryModel {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  find(id) {
    return this.countryModel.find(
      { ...id, ...{ isActive: true } },
      { states: 0, __v: 0, isActive: 0 },
    );
  }
}
