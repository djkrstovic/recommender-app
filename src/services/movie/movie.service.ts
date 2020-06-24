import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { Movie } from "entities/movie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie>{
    constructor( @InjectRepository(Movie) private readonly movie: Repository<Movie>){
        super(movie);
    }
}