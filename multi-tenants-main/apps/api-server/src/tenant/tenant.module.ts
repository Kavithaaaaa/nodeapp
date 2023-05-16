import { S3Service } from './../common/s3/s3.service';
import { TenantModel } from './tenant.model';
import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenants, TenantsSchema } from '../schemas/tenants.schema';
import { TenantController } from './tenant.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenants.name, schema: TenantsSchema }]),
  ],
  providers: [TenantModel, TenantService, S3Service],
  controllers: [TenantController],
})
export class TenantModule {}
