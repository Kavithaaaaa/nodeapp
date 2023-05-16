import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StateService } from '../services/state.service';
import { idDto } from '../dtos/query.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('state')
export class StateController {
  constructor(private readonly stateServices: StateService) {}

  @Get()
  getStateList() {
    return this.stateServices.getStates();
  }

  @Get(':id')
  findById(@Param() { id }: idDto) {
    return this.stateServices.getStatesWithCities({ _id: id });
  }
}
