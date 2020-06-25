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
import { TagEpisode } from 'entities/tag-episode.entity';
import { Tag } from 'entities/tag.entity';
import { TvSeries } from 'entities/tv-series.entity';
import { User } from 'entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { MovieController } from './controllers/api/movie.controller';
import { MovieService } from './services/movie/movie.service';
import { EpisodeController } from './controllers/api/episode.controller';
import { EpisodeService } from './services/episode/episode.service';
import { TvSeriesService } from './services/tv-series/tv-series.service';
import { TvSeriesController } from './controllers/api/tv-series.constroller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { TagController } from './controllers/api/tag.controller';
import { TagService } from './services/tag/tag.service';
import { GenreController } from './controllers/api/genre.controller';
import { GenreService } from './services/genre/genre.service';
import { UserController } from './controllers/api/user.controller';
import { UserService } from './services/user/user.service';

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
        TagEpisode,
        Tag,
        TvSeries,
        User,
       ]
    }),
    TypeOrmModule.forFeature([
      Administrator,
      Movie,
      Episode,
      TvSeries,
      Category,
      Tag,
      Genre,
      User,
    ])

  ],
  controllers: [
    AppController,
    AdministratorController,
    MovieController,
    EpisodeController,
    TvSeriesController,
    CategoryController,
    TagController,
    GenreController,
    UserController,
  ],
  providers: [
    AppService,
    AdministratorService,
    MovieService,
    EpisodeService,
    TvSeriesService,
    CategoryService,
    TagService,
    GenreService,
    UserService,
  ],
})
export class AppModule {}
