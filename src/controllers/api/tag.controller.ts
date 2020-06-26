import { Controller, Body, Post, Patch, Param } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Tag } from "src/entities/tag.entity";
import { TagService } from "src/services/tag/tag.service";
import { AddTagDto } from "src/dtos/tag/add.tag.dto";
import { EditTagDto } from "src/dtos/tag/edit.tag.dto copy";

@Controller('api/tags')
@Crud({
    model: {
        type: Tag
    },
    params: {
        id: {
            field: 'tagId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            tagEpisodes:{
                eager: true
            },
            tagMovies:{
                eager: true
            }
        }
    },
    routes:{
        exclude: ['updateOneBase', 'replaceOneBase', 'deleteOneBase']
    }
})
export class TagController{
    constructor(public service: TagService){}
    @Post('createTag') // http://localhost:3000/api/tags/createTag/
    createTag(@Body() data: AddTagDto){
        return this.service.createTag(data);
    }

    @Patch(':id') // PATCH http://localhost:3000/api/movie/2/
    editFullTag(@Param('id') id: number, @Body() data: EditTagDto){
        return this.service.editFullTag(id, data);
    }
}