import { Test, TestingModule } from '@nestjs/testing';
import { TimezoneService } from './timezone.service';
import { TimeZoneModel } from '../models/timezone.model';
import { timeZoneStud } from '../stubs/timezone.stub';

describe('TimezoneService', () => {
  let service: TimezoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TimeZoneModel,
          useValue: {
            find: jest.fn().mockResolvedValue(timeZoneStud),
          },
        },
        TimezoneService,
      ],
    }).compile();

    service = module.get<TimezoneService>(TimezoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call getTimeZoneData method', async () => {
    const result = await service.getTimeZoneData();
    expect(result).toEqual(timeZoneStud);
  });
});
