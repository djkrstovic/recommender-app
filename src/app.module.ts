import { Module, Get } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from'@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { Category } from 'entities/category.entity';
import { Episode } from 'entities/episode.entity';
import { Genre } from 'entities/genre.entity';
import { Movie } from 'entities/movie.entity';
import { RatingUserEpisode } from 'entities/rating-user-episode.entity';
import { RatingUserMovie } from 'entities/rating-user-movie.entity';
import { StatusUserEpisode } from 'entities/status-user-episode.entity';
import { StatusUserMovie } from 'entities/status-user-movie.entity';
import { TagMovie } from 'entities/tag-movie.entity';
import { TagTvSeries } from 'entities/tag-tv-series.entity';
import { Tag } from 'entities/tag.entity';
import { TvSeries } from 'entities/tv-series.entity';
import { User } from 'entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [ 
        Administrator,
        Category,
        Episode,
        Genre,
        Movie,
        RatingUserEpisode,
        RatingUserMovie,
        StatusUserEpisode,
        StatusUserMovie,
        TagMovie,
        TagTvSeries,
        Tag,
        TvSeries,
        User,
       ]
    }),
    TypeOrmModule.forFeature([Administrator])

  ],
  controllers: [
    AppController,
    AdministratorController,
  ],
  providers: [AppService, AdministratorService],
})
export class AppModule {}
