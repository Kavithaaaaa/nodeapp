import { Injectable } from '@nestjs/common';
import { CityModel } from '../models/city.model';

@Injectable()
export class CityService {
  constructor(private readonly cityModel: CityModel) {}

  getCities(id = {}) {
    return this.cityModel.find(id);
  }
}
