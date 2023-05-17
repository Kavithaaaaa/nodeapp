import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TenantModule } from './tenant/tenant.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { StateModule } from './common/modules/state.module';
import { TimezoneModule } from './common/modules/timezone.module';
import { CityModule } from './common/modules/city.module';
import { CountryModule } from './common/modules/country.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: `${configService.get<string>(
            'mongodb.connectionString',
          )}/${configService.get<string>('mongodb.dbName')}`,
        };
      },
      inject: [ConfigService],
    }),

    TenantModule,
    CountryModule,
    StateModule,
    CityModule,
    TimezoneModule,
    UserModule,
    AuthModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
