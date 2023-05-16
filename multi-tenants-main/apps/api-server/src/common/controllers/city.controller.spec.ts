import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';

import { CityService } from '../services/city.service';
import { cityStub } from '../stubs/city.stub';

const MockCityService = jest.fn().mockReturnValue({
  getCities: jest.fn().mockImplementation((ele) => {
    return ele ? cityStub.find((item) => (item._id = ele)) : cityStub;
  }),
});

describe('CityController', () => {
  let controller: CityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useClass: MockCityService,
        },
      ],
    }).compile();

    controller = module.get<CityController>(CityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be call getStateList method', () => {
    expect(controller.getCityList()).toBeDefined();
    expect(controller.getCityList()).toEqual(cityStub);
  });

  it('should be call findById method', () => {
    const idObj = { id: '644246d95f0f5ede0d856974' };
    expect(controller.findById(idObj)).toBeDefined();
    expect(controller.findById(idObj)).toEqual(cityStub[0]);
  });
});
