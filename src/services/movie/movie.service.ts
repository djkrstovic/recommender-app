import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { Movie } from "entities/movie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { TagMovie } from "entities/tag-movie.entity";

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
        newMovie.imagePath = data.imagePath;
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

}