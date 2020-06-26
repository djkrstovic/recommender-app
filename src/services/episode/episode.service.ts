import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Episode } from "src/entities/episode.entity";
import { TagEpisode } from "src/entities/tag-episode.entity";
import { AddEpisodeDto } from "src/dtos/episode/add.episode.dto";
import { ApiResponse } from "src/misc/api.response.class";

@Injectable()
export class EpisodeService extends TypeOrmCrudService<Episode>{
    constructor(
        @InjectRepository(Episode)
        private readonly episode: Repository<Episode>,
        @InjectRepository(TagEpisode)
        private readonly tagEpisode: Repository<TagEpisode>,){
        super(episode);
    }

    async createFullEpisode(data: AddEpisodeDto): Promise<Episode | TagEpisode | ApiResponse>{
        let newEpisode: Episode = new Episode();
        newEpisode.titleSrb = data.titleSrb;
        newEpisode.titleEng = data.titleEng;
        newEpisode.synopsis = data.synopsis;
        newEpisode.season = data.season;
        newEpisode.seasonEpisode = data.seasonEpisode;
        newEpisode.tvSeriesId = data.tvSeriesId;

        let savedEpisode = await this.episode.save(newEpisode);
        
        for(let tag of data.tags){
            let newTagEpisode: TagEpisode = new TagEpisode();
            newTagEpisode.episodeId = savedEpisode.episodeId;
            newTagEpisode.tagId = tag.tagId;

            await this.tagEpisode.save(newTagEpisode);
        }

        return await this.episode.findOne(savedEpisode.episodeId, {
            relations: [
                "tag",
                "tagEpisodes",
                "tvSeries",
            ]
        })

    }
}