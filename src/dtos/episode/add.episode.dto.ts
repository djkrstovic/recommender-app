export class AddEpisodeDto {
    titleSrb    : string;
    titleEng    : string;
    synopsis    : string;
    season      : number;
    seasonEpisode: number;
    tvSeriesId    : number;
    imagePath   : string;
    tags        : {
        tagId: number;
    }[];
}

