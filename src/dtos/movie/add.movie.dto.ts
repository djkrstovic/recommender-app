export class AddMovieDto {
    titleSrb    : string;
    titleEng    : string;
    director    : string;
    synopsis    : string;
    categoryId  : number;
    genreId     : number;
    tags        : {
        tagId: number;
    }[];
}

