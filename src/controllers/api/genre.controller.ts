import { Controller, Post, Body, Patch, Param, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Genre } from "src/entities/genre.entity";
import { GenreService } from "src/services/genre/genre.service";
import { AddGenreDto } from "src/dtos/genre/add.genre.dto";
import { EditGenreDto } from "src/dtos/genre/edit.genre.dto copy";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";

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
        only:[
            "getManyBase",
            "getOneBase",
        ],
        getManyBase:{
            decorators:[
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator', 'user'),
            ]
        },
        getOneBase:{
            decorators:[
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator', 'user'),
            ]
        },
    }
})
export class GenreController{
    constructor(public service: GenreService){}

    @Post('createGenre') // http://localhost:3000/api/genres/createGenre/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    createGenre(@Body() data: AddGenreDto){
        return this.service.createGenre(data);
    }

    @Patch(':id') // PATCH http://localhost:3000/api/genres/2/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    editFullGenre(@Param('id') id: number, @Body() data: EditGenreDto){
        return this.service.editFullGenre(id, data);
    }

}