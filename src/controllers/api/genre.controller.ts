import { Controller, Post, Body, Patch, Param } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Genre } from "src/entities/genre.entity";
import { GenreService } from "src/services/genre/genre.service";
import { AddGenreDto } from "src/dtos/genre/add.genre.dto";
import { EditGenreDto } from "src/dtos/genre/edit.genre.dto copy";

@Controller('api/genres')
@Crud({
    model: {
        type: Genre
    },
    params: {
        id: {
            field: 'genreId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            movies:{
                eager: true
            },
            tvSeries:{
                eager: true
            }
        }
    },
    routes:{
        exclude: ['updateOneBase', 'replaceOneBase', 'deleteOneBase']
    }
})
export class GenreController{
    constructor(public service: GenreService){}

    @Post('createGenre') // http://localhost:3000/api/genres/createGenre/
    createGenre(@Body() data: AddGenreDto){
        return this.service.createGenre(data);
    }

    @Patch(':id') // PATCH http://localhost:3000/api/movie/2/
    editFullGenre(@Param('id') id: number, @Body() data: EditGenreDto){
        return this.service.editFullGenre(id, data);
    }

}