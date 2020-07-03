import * as Validator from 'class-validator';

export class EditGenreDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(3, 64)
    name    : string;
}