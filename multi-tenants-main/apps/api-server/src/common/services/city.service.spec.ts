import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { cityStub } from '../stubs/city.stub';
import { CityModel } from '../models/city.model';

describe('CityService', () => {
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CityModel,
          useValue: { find: jest.fn().mockResolvedValue(cityStub) },
        },
        CityService,
      ],
    }).compile();

    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call getCities method', async () => {
    const result = await service.getCities();
    expect(result).toEqual(cityStub);
  });
});
