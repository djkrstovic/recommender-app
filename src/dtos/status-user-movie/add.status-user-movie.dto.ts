import * as Validator from 'class-validator';

export class AddStatusUserMovieDto {
    userId    : number;
    movieId    : number;
    
    @Validator.IsNotEmpty()
    @Validator.IsIn(["gledao", "zeli da gleda", "ne zeli da gleda"])
    status    : 'gledao' | 'zeli da gleda' | 'ne zeli da gleda';
}

