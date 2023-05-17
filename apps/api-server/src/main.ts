import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { config as aswConfig } from 'aws-sdk';
import { AuthGuard } from './auth/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: false, // if true, request can omit (or include as null or undefined) properties defined in the DTO
      enableDebugMessages: config.get('enableDebugMessage'),
      transform: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  aswConfig.update({
    accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
    region: config.get('AWS_REGION'),
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  //app.useGlobalGuards(new AuthGuard());

  const port = config.get('port') ?? 3050;

  await app.listen(port, () => {
    console.log('🚀 API Listening on port', port);
  });
}

bootstrap();
