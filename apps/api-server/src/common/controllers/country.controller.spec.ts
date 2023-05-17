import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';

import { CountryService } from '../services/country.service';
import { countryStub } from '../stubs/country.stub';

const MockCountryService = jest.fn().mockReturnValue({
  getCountry: jest.fn().mockImplementation((ele) => {
    return ele ? countryStub.find((item) => (item._id = ele)) : countryStub;
  }),
});

describe('CountryController', () => {
  let controller: CountryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [
        {
          provide: CountryService,
          useClass: MockCountryService,
        },
      ],
    }).compile();

    controller = module.get<CountryController>(CountryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be call getCountryList method', () => {
    expect(controller.getCountryList()).toBeDefined();
    expect(controller.getCountryList()).toEqual(countryStub);
  });

  it('should be call findById method', () => {
    const idObj = { id: '644246a1bf5fe294afca0e13' };
    expect(controller.findById(idObj)).toBeDefined();
    expect(controller.findById(idObj)).toEqual(countryStub[0]);
  });
});
