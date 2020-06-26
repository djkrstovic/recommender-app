export class EditMovieDto {
    titleSrb    : string;
    titleEng    : string;
    director    : string;
    synopsis    : string;
    categoryId  : number;
    genreId     : number;
    tags        : {
        tagId: number;
    }[] | null;
}

