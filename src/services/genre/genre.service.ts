import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genre } from "entities/genre.entity";
import { AddGenreDto } from "src/dtos/genre/add.genre.dto";
import { ApiResponse } from "src/misc/api.response.class";

@Injectable()
export class GenreService extends TypeOrmCrudService<Genre>{
    constructor(
        @InjectRepository(Genre)
        private readonly genre: Repository<Genre>){
        super(genre);
    }

    async createGenre(data: AddGenreDto): Promise<Genre | ApiResponse>{
        let newGenre: Genre = new Genre();
        newGenre.name = data.name;

        let savedGenre = await this.genre.save(newGenre);

        return await this.genre.findOne(savedGenre.genreId, {
            relations: [
                "movies",
                "tvSeries"
            ]
        })
    }
}