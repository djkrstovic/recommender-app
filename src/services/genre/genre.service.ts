import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genre } from "src/entities/genre.entity";
import { AddGenreDto } from "src/dtos/genre/add.genre.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { EditGenreDto } from "src/dtos/genre/edit.genre.dto copy";

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

    
    async editFullGenre(genreId: number, data: EditGenreDto): Promise<ApiResponse | Genre>{
        const existingGenre: Genre = await this.genre.findOne(genreId);
        
        if(!existingGenre){
            return new ApiResponse('error', -5001, 'Genre not found.')
        }

        existingGenre.name = data.name;
        
        const savedGenre: Genre = await this.genre.save(existingGenre);

        if(!savedGenre){
            return new ApiResponse('error', -5001, 'Could not save new TV Series data.')
        }

        return await this.genre.findOne(genreId, {
            relations: [
                "movies",
                "tvSeries"
            ]
        })

    }

}