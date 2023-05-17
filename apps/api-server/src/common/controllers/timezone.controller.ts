import { Controller, Get, UseGuards } from '@nestjs/common';
import { TimezoneService } from '../services/timezone.service';
import { AuthGuard } from '../../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('timezone')
export class TimezoneController {
  constructor(private readonly timeZoneService: TimezoneService) {}
  @Get()
  getTimeZoneList() {
    return this.timeZoneService.getTimeZoneData();
  }
}
