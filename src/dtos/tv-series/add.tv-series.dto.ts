import * as Validator from 'class-validator';

export class AddTvSeriesDto {
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
    @Validator.Length(3, 64)
    director    : string;

    
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(10, 10000)
    synopsis    : string;

    
    categoryId  : number;
    genreId     : number;
}

