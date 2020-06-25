import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Genre } from "entities/genre.entity";
import { GenreService } from "src/services/genre/genre.service";

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
        }
    }
})
export class GenreController{
    constructor(public service: GenreService){}
}