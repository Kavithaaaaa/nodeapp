import { statesWithCities } from './../stubs/state.stub';
import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from './state.service';
import { stateStub } from '../stubs/state.stub';
import { StateModel } from '../models/state.model';

describe('StateService', () => {
  let service: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StateModel,
          useValue: {
            getStates: jest.fn().mockResolvedValue(stateStub),
            getStatesWithCities: jest.fn().mockResolvedValue(statesWithCities),
          },
        },

        StateService,
      ],
    }).compile();

    service = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call getCountry method', async () => {
    const result = await service.getStates();
    expect(result).toEqual(stateStub);
  });
  it('should be call getStatesWithCities method', async () => {
    const result = await service.getStatesWithCities(
      '644246bb5b4630710ec6e3be',
    );
    expect(result).toEqual(statesWithCities);
  });
});
