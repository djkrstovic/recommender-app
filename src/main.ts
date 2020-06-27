import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { StorageConfig } from 'config/storage.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(StorageConfig.photoMovie.destination, {
    prefix: StorageConfig.photoMovie.urlPrefix,
    maxAge: StorageConfig.photoMovie.maxAge,
    index: false,
  })

  app.useStaticAssets(StorageConfig.photoEpisode.destination, {
    prefix: StorageConfig.photoEpisode.urlPrefix,
    maxAge: StorageConfig.photoEpisode.maxAge,
    index: false,
  })

  app.useStaticAssets(StorageConfig.photoTvSeries.destination, {
    prefix: StorageConfig.photoTvSeries.urlPrefix,
    maxAge: StorageConfig.photoTvSeries.maxAge,
    index: false,
  })

  await app.listen(3000);
}
bootstrap();
