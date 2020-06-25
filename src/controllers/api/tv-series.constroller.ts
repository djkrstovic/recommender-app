import { Controller, Body, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { TvSeries } from "entities/tv-series.entity";
import { TvSeriesService } from "src/services/tv-series/tv-series.service";
import { AddTvSeriesDto } from "src/dtos/tv-series/add.tv-series.dto";

@Controller('api/series')
@Crud({
    model: {
        type: TvSeries
    },
    params: {
        id: {
            field: 'episodeId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            category:{
                eager: true
            },
            genre:{
                eager: true
            }
        }
    }
})
export class TvSeriesController{
    constructor(public service: TvSeriesService){}
    @Post('createFull') // http://localhost:3000/api/series/createFull/
    createFullTvSeries(@Body() data: AddTvSeriesDto){
        return this.service.createFullTvSeries(data);
    }
}