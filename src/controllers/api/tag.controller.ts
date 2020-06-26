import { Controller, Body, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Tag } from "src/entities/tag.entity";
import { TagService } from "src/services/tag/tag.service";
import { AddTagDto } from "src/dtos/tag/add.tag.dto";

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
    }
})
export class TagController{
    constructor(public service: TagService){}
    @Post('createTag') // http://localhost:3000/api/tags/createTag/
    createTag(@Body() data: AddTagDto){
        return this.service.createTag(data);
    }
}