import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { Movie } from "src/entities/movie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { TagMovie } from "src/entities/tag-movie.entity";
import { EditMovieDto } from "src/dtos/movie/edit.movie.dto";
//import { MovieSearchDto } from "src/dtos/movie/movie.search.dto";

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie>{
    constructor(
        @InjectRepository(Movie)
        private readonly movie: Repository<Movie>,
        @InjectRepository(TagMovie)
        private readonly tagMovie: Repository<TagMovie>,
        ){
        super(movie);
    }
    
    async createFullMovie(data: AddMovieDto): Promise<Movie | TagMovie | ApiResponse>{
        let newMovie: Movie = new Movie();
        newMovie.titleSrb = data.titleSrb;
        newMovie.titleEng = data.titleEng;
        newMovie.director = data.director;
        newMovie.synopsis = data.synopsis;
        newMovie.categoryId = data.categoryId;
        newMovie.genreId    = data.genreId;

        let savedMovie = await this.movie.save(newMovie);
        
        for(let tag of data.tags){
            let newTagMovie: TagMovie = new TagMovie();
            newTagMovie.movieId = savedMovie.movieId;
            newTagMovie.tagId = tag.tagId;

            await this.tagMovie.save(newTagMovie);
        }

        return await this.movie.findOne(savedMovie.movieId, {
            relations: [
                "category",
                "genre",
                "tag",
                "tagMovies"
            ]
        })

    }

    async editFullMovie(movieId: number, data: EditMovieDto): Promise<ApiResponse | Movie>{
        const existingMovie: Movie = await this.movie.findOne(movieId, {
            relations: [ 'tagMovies', 'tag' ],
        });
        
        if(!existingMovie){
            return new ApiResponse('error', -5001, 'Movie not found.')
        }

        existingMovie.titleSrb = data.titleSrb;
        existingMovie.titleEng = data.titleEng;
        existingMovie.director = data.director;
        existingMovie.synopsis = data.synopsis;
        existingMovie.categoryId = data.categoryId;
        existingMovie.genreId = data.genreId;
        
        const savedMovie: Movie = await this.movie.save(existingMovie);

        if(!savedMovie){
            return new ApiResponse('error', -5001, 'Could not save new movie data.')
        }

        if(data.tags){
            await this.tagMovie.remove(existingMovie.tagMovies)

            for(let tag of data.tags){
                const newTagMovie = new TagMovie();
                newTagMovie.movieId = movieId;
                newTagMovie.tagId = tag.tagId;
    
                await this.tagMovie.save(newTagMovie);
            }

        }

        return await this.movie.findOne(movieId, {
            relations: [
                "category",
                "genre",
                "tag",
                "tagMovies"
            ]
        })

    }
/*
    async search(data: MovieSearchDto): Promise<Movie[]>{
        const builder = await this.movie.createQueryBuilder('movie');

        builder.innerJoin("movie.ratingUserMovies", "mr")

        builder.where('movie.categoryId = :catId', { catId: data.categoryId});

        builder.leftJoin("movie.tagMovies", "tm")

        if(data.keywords && data.keywords.length > 0){
            builder.andWhere(`movie.titleSrb LIKE :kw OR
                              movie.titleEng LIKE :kw OR
                              movie.director LIKE :kw OR
                              movie.synopsis LIKE :kw`,
                              { kw: '%' + data.keywords.trim() + '%'});
        }

        if(data.ratingMin && typeof data.ratingMin === 'number'){
            builder.andWhere('mr.rating >= :min', {min: data.ratingMin});
            
        }
        if(data.ratingMax && typeof data.ratingMax === 'number'){
            builder.andWhere('mr.rating <= :max', {max: data.ratingMax});
            
        }

        if(data.tags && data.tags.length > 0){
            for(const tag of data.tags){
                builder.andWhere('tm.tagId = :tId ', {tId: tag.tagId});
            }
        }

        let orderBy = 'tag';
        let orderDirection : 'ASC' | 'DESC' = 'ASC';

        if(data.orderBy){
            orderBy = data.orderBy;

            if(orderBy === 'rating'){
                orderBy = 'mr.rating'; // Potencijalna greska
            }
        }

        if(orderDirection){
            orderDirection = data.orderDirection;
        }

        builder.orderBy(orderBy, orderDirection);

        let page = 0;
        let perPage: 5 | 10 | 25 | 50 | 75 = 25;

        if(data.page && typeof data.page === 'number'){
            page = data.page;

        }

        if(data.itemsPerPage && typeof data.itemsPerPage === 'number'){
            perPage = data.itemsPerPage;
        }

        builder.skip(page * perPage);
        builder.take(perPage);

        let items = await builder.getMany();
        return items
    }
    */
}