import { Test, TestingModule } from '@nestjs/testing';
import { stateStub } from '../stubs/state.stub';
import { StateController } from './state.controller';
import { StateService } from '../services/state.service';

const MockStateService = jest.fn().mockReturnValue({
  getStates: jest.fn().mockImplementation((ele) => {
    return ele ? stateStub.find((item) => (item._id = ele)) : stateStub;
  }),
  getStatesWithCities: jest.fn().mockImplementation((ele) => {
    return ele ? stateStub.find((item) => (item._id = ele)) : stateStub;
  }),
});

describe('StateController', () => {
  let controller: StateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [
        {
          provide: StateService,
          useClass: MockStateService,
        },
      ],
    }).compile();

    controller = module.get<StateController>(StateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be call getStateList method', () => {
    expect(controller.getStateList()).toBeDefined();
    expect(controller.getStateList()).toEqual(stateStub);
  });

  it('should be call findById method', () => {
    const idObj = { id: '644246bb5b4630710ec6e3a9' };
    expect(controller.findById(idObj)).toBeDefined();
    expect(controller.findById(idObj)).toEqual(stateStub[0]);
  });
});
