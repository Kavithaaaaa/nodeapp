import { Injectable } from '@nestjs/common';
import { CountryModel } from '../models/country.model';

@Injectable()
export class CountryService {
  constructor(private readonly countryModel: CountryModel) {}

  getCountry(id = {}) {
    return this.countryModel.find(id);
  }
}
