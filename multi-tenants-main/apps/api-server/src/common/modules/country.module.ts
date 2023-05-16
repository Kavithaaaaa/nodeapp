import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from 'src/schemas';
import { CountryService } from '../services/country.service';
import { CountryController } from '../controllers/country.controller';
import { CountryModel } from '../models/country.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  providers: [CountryModel, CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
