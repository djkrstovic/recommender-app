import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TvSeries } from "entities/tv-series.entity";

@Injectable()
export class TvSeriesService extends TypeOrmCrudService<TvSeries>{
    constructor( @InjectRepository(TvSeries) private readonly tvSeries: Repository<TvSeries>){
        super(tvSeries);
    }
}