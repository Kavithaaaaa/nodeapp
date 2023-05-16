import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from '../services/country.service';
import { idDto } from '../dtos/query.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryServices: CountryService) {}

  @Get()
  getCountryList() {
    return this.countryServices.getCountry();
  }

  @Get(':id')
  findById(@Param() { id }: idDto) {
    return this.countryServices.getCountry({ _id: id });
  }
}
