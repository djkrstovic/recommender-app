import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Episode } from "entities/episode.entity";

@Injectable()
export class EpisodeService extends TypeOrmCrudService<Episode>{
    constructor( @InjectRepository(Episode) private readonly episode: Repository<Episode>){
        super(episode);
    }
}