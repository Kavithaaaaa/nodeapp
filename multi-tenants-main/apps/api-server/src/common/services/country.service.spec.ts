import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { countryStub } from '../stubs/country.stub';
import { CountryModel } from '../models/country.model';

describe('CountryService', () => {
  let service: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CountryModel,
          useValue: { find: jest.fn().mockResolvedValue(countryStub) },
        },
        CountryService,
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call getCountry method', async () => {
    const result = await service.getCountry();
    expect(result).toEqual(countryStub);
  });
});
