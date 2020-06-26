import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PhotoTvSeries } from "entities/photo-tv-series.entity";

@Injectable()
export class PhotoTvSeriesService extends TypeOrmCrudService<PhotoTvSeries>{
    constructor(@InjectRepository(PhotoTvSeries) private readonly photoTvSeries: Repository<PhotoTvSeries>){
        super(photoTvSeries);
    }

    add(newPhotoTvSeries:PhotoTvSeries): Promise<PhotoTvSeries>{
        return this.photoTvSeries.save(newPhotoTvSeries);
    }
}