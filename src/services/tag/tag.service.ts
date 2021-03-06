import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "src/entities/tag.entity";
import { AddTagDto } from "src/dtos/tag/add.tag.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { EditTagDto } from "src/dtos/tag/edit.tag.dto copy";

@Injectable()
export class TagService extends TypeOrmCrudService<Tag>{
    constructor(
        @InjectRepository(Tag)
        private readonly tag: Repository<Tag>){
        super(tag);
    }

    async createTag(data: AddTagDto): Promise<Tag | ApiResponse>{
        let newTag: Tag = new Tag();
        newTag.tagName = data.tagName;

        let savedTag = await this.tag.save(newTag);

        return await this.tag.findOne(savedTag.tagId, {
            relations: [
                "tagEpisodes",
                "tagMovies"
            ]
        })
    }

    async editFullTag(tagId: number, data: EditTagDto): Promise<ApiResponse | Tag>{
        const existingTag: Tag = await this.tag.findOne(tagId);
        
        if(!existingTag){
            return new ApiResponse('error', -5001, 'Tag not found.')
        }

        existingTag.tagName = data.tagName;
        
        const savedTag: Tag = await this.tag.save(existingTag);

        if(!savedTag){
            return new ApiResponse('error', -5001, 'Could not save new TV Series data.')
        }

        return await this.tag.findOne(tagId, {
            relations: [
                "tagEpisodes",
                "tagMovies"
            ]
        })

    }
}