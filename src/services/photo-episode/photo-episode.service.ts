import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PhotoEpisode } from "entities/photo-episode.entity";

@Injectable()
export class PhotoEpisodeService extends TypeOrmCrudService<PhotoEpisode>{
    constructor(@InjectRepository(PhotoEpisode) private readonly photoEpisode: Repository<PhotoEpisode>){
        super(photoEpisode);
    }

    add(newPhotoEpisode:PhotoEpisode): Promise<PhotoEpisode>{
        return this.photoEpisode.save(newPhotoEpisode);
    }
}