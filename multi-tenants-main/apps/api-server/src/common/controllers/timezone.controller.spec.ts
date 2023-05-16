import { timeZoneStud } from './../stubs/timezone.stub';
import { Test, TestingModule } from '@nestjs/testing';
import { TimezoneController } from './timezone.controller';
import { TimezoneService } from '../services/timezone.service';

describe('TimezoneController', () => {
  let controller: TimezoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimezoneController],
      providers: [
        {
          provide: TimezoneService,
          useValue: {
            getTimeZoneData: jest.fn().mockReturnValue(timeZoneStud),
          },
        },
      ],
    }).compile();

    controller = module.get<TimezoneController>(TimezoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be call getTimeZoneList method', () => {
    expect(controller.getTimeZoneList()).toBeDefined();
    expect(controller.getTimeZoneList()).toEqual(timeZoneStud);
  });
});
