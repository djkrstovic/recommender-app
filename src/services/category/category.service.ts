import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "src/entities/category.entity";

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category>{
    constructor( @InjectRepository(Category) private readonly category: Repository<Category>){
        super(category);
    }
}