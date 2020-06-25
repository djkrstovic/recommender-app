import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TvSeries } from "entities/tv-series.entity";
import { AddTvSeriesDto } from "src/dtos/tv-series/add.tv-series.dto";
import { ApiResponse } from "src/misc/api.response.class";

@Injectable()
export class TvSeriesService extends TypeOrmCrudService<TvSeries>{
    constructor(
        @InjectRepository(TvSeries)
        private readonly tvSeries: Repository<TvSeries>){
        super(tvSeries);
    }

    async createFullTvSeries(data: AddTvSeriesDto): Promise<TvSeries | ApiResponse>{
        let newTvSeries: TvSeries = new TvSeries();
        newTvSeries.titleSrb = data.titleSrb;
        newTvSeries.titleEng = data.titleEng;
        newTvSeries.director = data.director;
        newTvSeries.synopsis = data.synopsis;
        newTvSeries.imagePath = data.imagePath;
        newTvSeries.categoryId = data.categoryId;
        newTvSeries.genreId    = data.genreId;

        let savedTvSeries = await this.tvSeries.save(newTvSeries);

        return await this.tvSeries.findOne(savedTvSeries.tvSeriesId, {
            relations: [
                "category",
                "genre"
            ]
        })
    }
}