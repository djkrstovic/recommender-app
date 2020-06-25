import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Episode } from "entities/episode.entity";
import { EpisodeService } from "src/services/episode/episode.service";

@Controller('api/episode')
@Crud({
    model: {
        type: Episode
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
            tvSeries:{
                eager: true
            },
            ratingUserEpisodes:{
                eager: true
            },
            tagEpisodes:{
                eager: true
            },
            tag:{
                eager: true
            }
        }
    }
})
export class EpisodeController{
    constructor(public service: EpisodeService){}
}