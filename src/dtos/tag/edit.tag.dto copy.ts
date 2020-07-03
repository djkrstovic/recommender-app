import * as Validator from 'class-validator';

export class EditTagDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(3, 64)
    tagName    : string;
}

