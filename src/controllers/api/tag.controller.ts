import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Tag } from "entities/tag.entity";
import { TagService } from "src/services/tag/tag.service";

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
        }
    }
})
export class TagController{
    constructor(public service: TagService){}
}