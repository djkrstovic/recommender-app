import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TvSeries } from "src/entities/tv-series.entity";
import { AddTvSeriesDto } from "src/dtos/tv-series/add.tv-series.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { EditTvSeriesDto } from "src/dtos/tv-series/edit.tv-series.dto copy";

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
    
    async editFullTvSeries(tvSeriesId: number, data: EditTvSeriesDto): Promise<ApiResponse | TvSeries>{
        const existingTvSeries: TvSeries = await this.tvSeries.findOne(tvSeriesId);
        
        if(!existingTvSeries){
            return new ApiResponse('error', -5001, 'TvSeries not found.')
        }

        existingTvSeries.titleSrb = data.titleSrb;
        existingTvSeries.titleEng = data.titleEng;
        existingTvSeries.synopsis = data.synopsis;
        existingTvSeries.director = data.director;
        existingTvSeries.categoryId = data.categoryId;
        existingTvSeries.genreId    = data.genreId;
        
        const savedTvSeries: TvSeries = await this.tvSeries.save(existingTvSeries);

        if(!savedTvSeries){
            return new ApiResponse('error', -5001, 'Could not save new TV Series data.')
        }

        return await this.tvSeries.findOne(tvSeriesId, {
            relations: [
                "category",
                "genre"
            ]
        })

    }

}