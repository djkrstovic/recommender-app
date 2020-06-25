import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { TvSeries } from "entities/tv-series.entity";
import { TvSeriesService } from "src/services/tv-series/tv-series.service";

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
}