import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { State, StateSchema } from 'src/schemas';

import { StateService } from '../services/state.service';
import { StateController } from '../controllers/state.controller';
import { StateModel } from '../models/state.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: State.name, schema: StateSchema }]),
  ],
  providers: [StateModel, StateService],
  controllers: [StateController],
})
export class StateModule {}
