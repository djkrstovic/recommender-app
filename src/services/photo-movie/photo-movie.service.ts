import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { PhotoMovie } from "src/entities/photo-movie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PhotoMovieService extends TypeOrmCrudService<PhotoMovie>{
    constructor(@InjectRepository(PhotoMovie) private readonly photoMovie: Repository<PhotoMovie>){
        super(photoMovie);
    }

    add(newPhotoMovie:PhotoMovie): Promise<PhotoMovie>{
        return this.photoMovie.save(newPhotoMovie);
    }
}