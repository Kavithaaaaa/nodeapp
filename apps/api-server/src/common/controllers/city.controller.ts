import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CityService } from '../services/city.service';
import { idDto } from '../dtos/query.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('city')
export class CityController {
  constructor(private readonly cityServices: CityService) {}

  @Get()
  getCityList() {
    return this.cityServices.getCities();
  }

  @Get(':id')
  findById(@Param() { id }: idDto) {
    return this.cityServices.getCities({ _id: id });
  }
}
