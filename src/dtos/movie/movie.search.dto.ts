/*import * as Validator from 'class-validator';
import { MovieSearchTagsComponentDto } from './movie.search.tags.component.dto';

export class MovieSearchDto{

    categoryId: number;

    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.Length(2, 64)
    keywords: string;

    @Validator.IsOptional()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0,
    })
    @Validator.IsPositive()
    ratingMin: number;

    @Validator.IsOptional()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0,
    })
    @Validator.IsPositive()
    ratingMax: number;


    tags: MovieSearchTagsComponentDto[];

    @Validator.IsOptional()
    @Validator.IsIn(['tag', 'rating'])
    orderBy: 'tag' | 'rating';

    @Validator.IsOptional()
    @Validator.IsIn(['ASC', 'DESC'])
    orderDirection: 'ASC' | 'DESC';

    @Validator.IsOptional()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0,
    })
    @Validator.IsPositive()
    page: number;

    @Validator.IsOptional()
    @Validator.IsIn([5, 10, 25, 50, 75])
    itemsPerPage: 5 | 10 | 25 | 50 | 75;
}*/