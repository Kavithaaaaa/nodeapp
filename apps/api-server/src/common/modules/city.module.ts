import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityService } from '../services/city.service';
import { CityController } from '../controllers/city.controller';
import { City, CitySchema } from 'src/schemas';
import { CityModel } from '../models/city.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  providers: [CityModel, CityService],
  controllers: [CityController],
})
export class CityModule {}
