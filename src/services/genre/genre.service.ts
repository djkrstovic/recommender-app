import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genre } from "entities/genre.entity";

@Injectable()
export class GenreService extends TypeOrmCrudService<Genre>{
    constructor( @InjectRepository(Genre) private readonly genre: Repository<Genre>){
        super(genre);
    }
}