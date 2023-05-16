import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeZone, TimeZoneSchema } from 'src/schemas';
import { TimezoneController } from '../controllers/timezone.controller';
import { TimezoneService } from '../services/timezone.service';
import { TimeZoneModel } from '../models/timezone.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TimeZone.name, schema: TimeZoneSchema },
    ]),
  ],
  providers: [TimeZoneModel, TimezoneService],
  controllers: [TimezoneController],
})
export class TimezoneModule {}
