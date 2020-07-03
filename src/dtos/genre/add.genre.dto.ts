import * as Validator from 'class-validator';

export class AddGenreDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(3, 64)
    name    : string;
}