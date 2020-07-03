import * as Validator from 'class-validator';

export class EditRatingUserMovieDto {
    userId    : number;
    movieId    : number;
    
    @Validator.IsNotEmpty()
    @Validator.IsIn(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
    rating    : '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
}

