import * as Validator from 'class-validator';

export class AddEpisodeDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(3, 64)
    titleSrb    : string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(3, 64)
    titleEng    : string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(10, 10000)
    synopsis    : string;

    @Validator.IsNotEmpty()
    @Validator.IsNumber({
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    })
    @Validator.Length(1, 3)
    season      : number;

    @Validator.IsNotEmpty()
    @Validator.IsNumber({
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    })
    @Validator.Length(1, 3)
    seasonEpisode: number;

    tvSeriesId    : number;
    tags        : {
        tagId: number;
    }[];
}

