import { Injectable } from '@nestjs/common';
import { StateModel } from '../models/state.model';

@Injectable()
export class StateService {
  constructor(private readonly stateModel: StateModel) {}
  getStates(id = {}) {
    return this.stateModel.getStates(id);
  }
  getStatesWithCities(id = {}) {
    return this.stateModel.getStatesWithCities(id);
  }
}
