import { Controller, Post, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Movie } from "entities/movie.entity";
import { MovieService } from "src/services/movie/movie.service";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";

@Controller('api/movie')
@Crud({
    model: {
        type: Movie
    },
    params: {
        id: {
            field: 'movieId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            category:{
                eager: true
            },
            genre:{
                eager: true
            },
            tagMovies:{
                eager: true
            },
            ratingUserMovies:{
                eager: true
            },
            tag:{
                eager: true
            }
        }
    }
})
export class MovieController{
    constructor(public service: MovieService){}

    @Post('createFull') // http://localhost:3000/api/movie/createFull/
    createFullMovie(@Body() data: AddMovieDto){
        return this.service.createFullMovie(data);
    }
}