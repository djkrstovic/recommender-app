import { Module, Get, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from'@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { Category } from 'src/entities/category.entity';
import { Episode } from 'src/entities/episode.entity';
import { Genre } from 'src/entities/genre.entity';
import { Movie } from 'src/entities/movie.entity';
import { RatingUserEpisode } from 'src/entities/rating-user-episode.entity';
import { RatingUserMovie } from 'src/entities/rating-user-movie.entity';
import { StatusUserEpisode } from 'src/entities/status-user-episode.entity';
import { StatusUserMovie } from 'src/entities/status-user-movie.entity';
import { TagMovie } from 'src/entities/tag-movie.entity';
import { TagEpisode } from 'src/entities/tag-episode.entity';
import { Tag } from 'src/entities/tag.entity';
import { TvSeries } from 'src/entities/tv-series.entity';
import { User } from 'src/entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { MovieController } from './controllers/api/movie.controller';
import { MovieService } from './services/movie/movie.service';
import { EpisodeController } from './controllers/api/episode.controller';
import { EpisodeService } from './services/episode/episode.service';
import { TvSeriesService } from './services/tv-series/tv-series.service';
import { TvSeriesController } from './controllers/api/tv-series.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { TagController } from './controllers/api/tag.controller';
import { TagService } from './services/tag/tag.service';
import { GenreController } from './controllers/api/genre.controller';
import { GenreService } from './services/genre/genre.service';
import { UserController } from './controllers/api/user.controller';
import { UserService } from './services/user/user.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PhotoMovie } from 'src/entities/photo-movie.entity';
import { PhotoEpisode } from 'src/entities/photo-episode.entity';
import { PhotoTvSeries } from 'src/entities/photo-tv-series.entity';
import { PhotoMovieService } from './services/photo-movie/photo-movie.service';
import { PhotoEpisodeService } from './services/photo-episode/photo-episode.service';
import { PhotoTvSeriesService } from './services/photo-tv-series/photo-tv-series.service';
import { UserToken } from './entities/user-token.entity';

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
        PhotoMovie,
        PhotoEpisode,
        PhotoTvSeries,
        UserToken,
       ]
    }),
    TypeOrmModule.forFeature([
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
        PhotoMovie,
        PhotoEpisode,
        PhotoTvSeries,
        UserToken,
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
    AuthController,
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
    TvSeriesService,
    PhotoMovieService,
    PhotoEpisodeService,
    PhotoTvSeriesService,
    UserService,
  ],
  exports:[
    AdministratorService,
    UserService,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/*')
      .forRoutes('api/*')
  }
}
