import * as Validator from 'class-validator';

export class AddTagDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(3, 64)
    tagName    : string;
}

