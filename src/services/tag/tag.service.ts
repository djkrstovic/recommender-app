import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "entities/tag.entity";

@Injectable()
export class TagService extends TypeOrmCrudService<Tag>{
    constructor( @InjectRepository(Tag) private readonly tag: Repository<Tag>){
        super(tag);
    }
}