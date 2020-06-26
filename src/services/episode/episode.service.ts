import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Episode } from "src/entities/episode.entity";
import { TagEpisode } from "src/entities/tag-episode.entity";
import { AddEpisodeDto } from "src/dtos/episode/add.episode.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { EditEpisodeDto } from "src/dtos/episode/edit.episode.dto copy";

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

    async editFullEpisode(episodeId: number, data: EditEpisodeDto): Promise<ApiResponse | Episode>{
        const existingEpisode: Episode = await this.episode.findOne(episodeId, {
            relations: [ 'tagEpisodes', 'tag' ],
        });
        
        if(!existingEpisode){
            return new ApiResponse('error', -5001, 'Episode not found.')
        }

        existingEpisode.titleSrb = data.titleSrb;
        existingEpisode.titleEng = data.titleEng;
        existingEpisode.synopsis = data.synopsis;
        existingEpisode.season = data.season;
        existingEpisode.seasonEpisode = data.seasonEpisode;
        existingEpisode.tvSeriesId = data.tvSeriesId;
        
        const savedEpisode: Episode = await this.episode.save(existingEpisode);

        if(!savedEpisode){
            return new ApiResponse('error', -5001, 'Could not save new episode data.')
        }

        if(data.tags){
            await this.tagEpisode.remove(existingEpisode.tagEpisodes)

            for(let tag of data.tags){
                const newTagEpisode = new TagEpisode();
                newTagEpisode.episodeId = episodeId;
                newTagEpisode.tagId = tag.tagId;
    
                await this.tagEpisode.save(newTagEpisode);
            }

        }

        return await this.episode.findOne(episodeId, {
            relations: [
                "tag",
                "tagEpisodes",
                "tvSeries"
            ]
        })

    }

}