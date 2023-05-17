import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { State } from '../../schemas';

@Injectable()
export class StateModel {
  constructor(
    @InjectModel(State.name)
    private readonly stateModel: Model<State>,
  ) {}

  getStates(id) {
    return this.stateModel.find(
      { ...id, ...{ isActive: true } },
      { cities: 0, __v: 0, isActive: 0, country: 0 },
    );
  }
  getStatesWithCities(id) {
    return this.stateModel.find({ ...id, ...{ isActive: true } }).populate([
      {
        select: { name: 1, _id: 1 },
        path: 'country',
        model: 'Country',
      },
      {
        select: { name: 1, _id: 1 },
        path: 'cities',
        model: 'City',
      },
    ]);
  }
}
